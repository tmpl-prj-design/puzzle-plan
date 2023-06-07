/**
 * 数据缓存处理，站内缓存 / 长期缓存
 * @example
 * storage.set('key', '222')
 * storage.get('key')
 */
export const storage = {
  set: (key, value, useSession) => {
    if (useSession) {
      sessionStorage.setItem(key, JSON.stringify(value))
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  },
  get: (key, useSession) => {
    const value = useSession ? sessionStorage.getItem(key) : localStorage.getItem(key)
    if (!value || value === 'null') return null
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  remove: (key, useSession) => {
    if (useSession) {
      sessionStorage.removeItem(key)
      return
    }
    localStorage.removeItem(key)
  },
  clear: useSession => {
    if (useSession) {
      sessionStorage.clear()
      return
    }
    localStorage.clear()
  }
}

/**
 * 数据缓存处理（短暂的临时缓存，页面注销缓存清空）
 * length：缓存的数据长度
 * @example
 * const dataCache = new Cache(10)
 * dataCache.set('key', '222')
 * dataCache.get('key')
 */
export class Cache {
  constructor(length = 100) {
    // 长度限制
    this.length = length
    // 数据容器
    this.map = new Map()
  }

  set(key, value) {
    // 判断容量
    if (this.map.size >= this.length) {
      const firstKey = this.map.keys().next().value
      this.map.delete(firstKey)
    }

    // 删除已存在值
    if (this.map.has(key)) {
      this.map.delete(key)
    }

    // 加入
    this.map.set(key, value)
  }

  get(key) {
    if (!this.map.has(key)) {
      return null
    }

    return this.map.get(key)
  }
}
