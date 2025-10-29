// global.d.ts
declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.css?raw' {
  const content: any;
  export default content;
}
