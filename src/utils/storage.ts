class LocalStorageWrapper<T = any> {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  // Helper method to get the full key with prefix
  private _getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  // Set an item in localStorage
  setItem(key: string, value: T): void {
    try {
      const fullKey = this._getFullKey(key);
      const stringValue = JSON.stringify(value);
      localStorage.setItem(fullKey, stringValue);
    } catch (error) {
      console.error('Error setting item in localStorage', error);
    }
  }

  // Get an item from localStorage
  getItem(key: string, defaultValue: T | null = null): T | null {
    try {
      const fullKey = this._getFullKey(key);
      const value = localStorage.getItem(fullKey);
      return value ? JSON.parse(value) as T : defaultValue;
    } catch (error) {
      console.error('Error getting item from localStorage', error);
      return defaultValue;
    }
  }

  // Remove an item from localStorage
  removeItem(key: string): void {
    try {
      const fullKey = this._getFullKey(key);
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error('Error removing item from localStorage', error);
    }
  }

  // Clear all items with the current prefix
  clear(): void {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }

  // Check if an item exists in localStorage
  hasItem(key: string): boolean {
    const fullKey = this._getFullKey(key);
    return localStorage.getItem(fullKey) !== null;
  }
}

// Usage example:
const storage = new LocalStorageWrapper<{ name: string; age: number }>('myApp_');

// Setting an item
storage.setItem('user', { name: 'John Doe', age: 30 });

// Getting an item
const user = storage.getItem('user');
console.log(user); // Output: { name: 'John Doe', age: 30 }

// Removing an item
storage.removeItem('user');

// Checking if an item exists
console.log(storage.hasItem('user')); // Output: false

// Clearing all items with the prefix
storage.clear();
