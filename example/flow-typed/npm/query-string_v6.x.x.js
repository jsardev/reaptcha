// flow-typed signature: 1a14eef988547b1e3302b701cfa49803
// flow-typed version: 8dd6b0d069/query-string_v6.x.x/flow_>=v0.32.x

declare module 'query-string' {
  declare type ArrayFormat = 'none' | 'bracket' | 'index'
  declare type ParseOptions = {|
    arrayFormat?: ArrayFormat,
  |}

  declare type StringifyOptions = {|
    arrayFormat?: ArrayFormat,
    encode?: boolean,
    strict?: boolean,
  |}

  declare module.exports: {
    extract(str: string): string,
    parse(str: string, opts?: ParseOptions): Object,
    parseUrl(str: string, opts?: ParseOptions): { url: string, query: Object },
    stringify(obj: Object, opts?: StringifyOptions): string,
  }
}
