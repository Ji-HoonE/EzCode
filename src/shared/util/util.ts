/** 유틸 함수 */
export class Util {
  static ServerLog(data: unknown, name?: string): void {
    const header = name ? `Debug Output: ${name}` : 'Debug Output';

    if (data === undefined || data === null) {
      console.log(`\n=== ${header} ===\n`);
      console.log(data);
      console.log('\n==================\n');
      return;
    }
    const stringified = JSON.stringify(data, null, 2).replace(/\\n/g, '\n').replace(/\\"/g, '"');
    console.log(`\n=== ${header} ===\n`);
    console.log(stringified);
    console.log('\n==================\n');
  }
  /** 빈 값 체크 */
  static isEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    if (value === false || value === 0) return true;
    return false;
  }
}
