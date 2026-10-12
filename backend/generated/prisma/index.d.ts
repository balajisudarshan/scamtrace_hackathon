
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model Indicator
 * 
 */
export type Indicator = $Result.DefaultSelection<Prisma.$IndicatorPayload>
/**
 * Model ReportIndicator
 * 
 */
export type ReportIndicator = $Result.DefaultSelection<Prisma.$ReportIndicatorPayload>
/**
 * Model MatchEvidence
 * 
 */
export type MatchEvidence = $Result.DefaultSelection<Prisma.$MatchEvidencePayload>
/**
 * Model ReviewDecision
 * 
 */
export type ReviewDecision = $Result.DefaultSelection<Prisma.$ReviewDecisionPayload>
/**
 * Model CaseNote
 * 
 */
export type CaseNote = $Result.DefaultSelection<Prisma.$CaseNotePayload>
/**
 * Model AuditEvent
 * 
 */
export type AuditEvent = $Result.DefaultSelection<Prisma.$AuditEventPayload>
/**
 * Model TrendSnapshot
 * 
 */
export type TrendSnapshot = $Result.DefaultSelection<Prisma.$TrendSnapshotPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  PUBLIC: 'PUBLIC',
  ANALYST: 'ANALYST',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ReportStatus: {
  RECEIVED: 'RECEIVED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  CORROBORATED: 'CORROBORATED',
  DISPUTED: 'DISPUTED',
  REJECTED: 'REJECTED',
  PUBLISHED: 'PUBLISHED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]


export const RiskLevel: {
  LOW_SIGNAL: 'LOW_SIGNAL',
  NEEDS_CAUTION: 'NEEDS_CAUTION',
  HIGH_RISK: 'HIGH_RISK'
};

export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel]


export const IndicatorType: {
  DOMAIN: 'DOMAIN',
  URL: 'URL',
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  PHRASE: 'PHRASE',
  SOCIAL_HANDLE: 'SOCIAL_HANDLE',
  TACTIC: 'TACTIC',
  BRAND: 'BRAND'
};

export type IndicatorType = (typeof IndicatorType)[keyof typeof IndicatorType]


export const SourceType: {
  COMMUNITY: 'COMMUNITY',
  SEEDED: 'SEEDED',
  IMPORTED: 'IMPORTED',
  SYNTHETIC: 'SYNTHETIC'
};

export type SourceType = (typeof SourceType)[keyof typeof SourceType]


export const AuditAction: {
  REPORT_SUBMITTED: 'REPORT_SUBMITTED',
  REPORT_REVIEWED: 'REPORT_REVIEWED',
  REPORT_PUBLISHED: 'REPORT_PUBLISHED',
  REPORT_REJECTED: 'REPORT_REJECTED',
  REPORT_DISPUTED: 'REPORT_DISPUTED',
  INDICATOR_EXTRACTED: 'INDICATOR_EXTRACTED',
  CASE_NOTE_ADDED: 'CASE_NOTE_ADDED',
  ACCESS_RESTRICTED_DATA: 'ACCESS_RESTRICTED_DATA'
};

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

export type RiskLevel = $Enums.RiskLevel

export const RiskLevel: typeof $Enums.RiskLevel

export type IndicatorType = $Enums.IndicatorType

export const IndicatorType: typeof $Enums.IndicatorType

export type SourceType = $Enums.SourceType

export const SourceType: typeof $Enums.SourceType

export type AuditAction = $Enums.AuditAction

export const AuditAction: typeof $Enums.AuditAction

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.indicator`: Exposes CRUD operations for the **Indicator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Indicators
    * const indicators = await prisma.indicator.findMany()
    * ```
    */
  get indicator(): Prisma.IndicatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reportIndicator`: Exposes CRUD operations for the **ReportIndicator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReportIndicators
    * const reportIndicators = await prisma.reportIndicator.findMany()
    * ```
    */
  get reportIndicator(): Prisma.ReportIndicatorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchEvidence`: Exposes CRUD operations for the **MatchEvidence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchEvidences
    * const matchEvidences = await prisma.matchEvidence.findMany()
    * ```
    */
  get matchEvidence(): Prisma.MatchEvidenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reviewDecision`: Exposes CRUD operations for the **ReviewDecision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReviewDecisions
    * const reviewDecisions = await prisma.reviewDecision.findMany()
    * ```
    */
  get reviewDecision(): Prisma.ReviewDecisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.caseNote`: Exposes CRUD operations for the **CaseNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CaseNotes
    * const caseNotes = await prisma.caseNote.findMany()
    * ```
    */
  get caseNote(): Prisma.CaseNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditEvent`: Exposes CRUD operations for the **AuditEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditEvents
    * const auditEvents = await prisma.auditEvent.findMany()
    * ```
    */
  get auditEvent(): Prisma.AuditEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trendSnapshot`: Exposes CRUD operations for the **TrendSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrendSnapshots
    * const trendSnapshots = await prisma.trendSnapshot.findMany()
    * ```
    */
  get trendSnapshot(): Prisma.TrendSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Report: 'Report',
    Indicator: 'Indicator',
    ReportIndicator: 'ReportIndicator',
    MatchEvidence: 'MatchEvidence',
    ReviewDecision: 'ReviewDecision',
    CaseNote: 'CaseNote',
    AuditEvent: 'AuditEvent',
    TrendSnapshot: 'TrendSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "report" | "indicator" | "reportIndicator" | "matchEvidence" | "reviewDecision" | "caseNote" | "auditEvent" | "trendSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      Indicator: {
        payload: Prisma.$IndicatorPayload<ExtArgs>
        fields: Prisma.IndicatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IndicatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IndicatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>
          }
          findFirst: {
            args: Prisma.IndicatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IndicatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>
          }
          findMany: {
            args: Prisma.IndicatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>[]
          }
          create: {
            args: Prisma.IndicatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>
          }
          createMany: {
            args: Prisma.IndicatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IndicatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>[]
          }
          delete: {
            args: Prisma.IndicatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>
          }
          update: {
            args: Prisma.IndicatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>
          }
          deleteMany: {
            args: Prisma.IndicatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IndicatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IndicatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>[]
          }
          upsert: {
            args: Prisma.IndicatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndicatorPayload>
          }
          aggregate: {
            args: Prisma.IndicatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIndicator>
          }
          groupBy: {
            args: Prisma.IndicatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<IndicatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.IndicatorCountArgs<ExtArgs>
            result: $Utils.Optional<IndicatorCountAggregateOutputType> | number
          }
        }
      }
      ReportIndicator: {
        payload: Prisma.$ReportIndicatorPayload<ExtArgs>
        fields: Prisma.ReportIndicatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportIndicatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportIndicatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>
          }
          findFirst: {
            args: Prisma.ReportIndicatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportIndicatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>
          }
          findMany: {
            args: Prisma.ReportIndicatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>[]
          }
          create: {
            args: Prisma.ReportIndicatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>
          }
          createMany: {
            args: Prisma.ReportIndicatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportIndicatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>[]
          }
          delete: {
            args: Prisma.ReportIndicatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>
          }
          update: {
            args: Prisma.ReportIndicatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>
          }
          deleteMany: {
            args: Prisma.ReportIndicatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportIndicatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportIndicatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>[]
          }
          upsert: {
            args: Prisma.ReportIndicatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportIndicatorPayload>
          }
          aggregate: {
            args: Prisma.ReportIndicatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReportIndicator>
          }
          groupBy: {
            args: Prisma.ReportIndicatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportIndicatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportIndicatorCountArgs<ExtArgs>
            result: $Utils.Optional<ReportIndicatorCountAggregateOutputType> | number
          }
        }
      }
      MatchEvidence: {
        payload: Prisma.$MatchEvidencePayload<ExtArgs>
        fields: Prisma.MatchEvidenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchEvidenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchEvidenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>
          }
          findFirst: {
            args: Prisma.MatchEvidenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchEvidenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>
          }
          findMany: {
            args: Prisma.MatchEvidenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>[]
          }
          create: {
            args: Prisma.MatchEvidenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>
          }
          createMany: {
            args: Prisma.MatchEvidenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchEvidenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>[]
          }
          delete: {
            args: Prisma.MatchEvidenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>
          }
          update: {
            args: Prisma.MatchEvidenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>
          }
          deleteMany: {
            args: Prisma.MatchEvidenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchEvidenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchEvidenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>[]
          }
          upsert: {
            args: Prisma.MatchEvidenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchEvidencePayload>
          }
          aggregate: {
            args: Prisma.MatchEvidenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchEvidence>
          }
          groupBy: {
            args: Prisma.MatchEvidenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchEvidenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchEvidenceCountArgs<ExtArgs>
            result: $Utils.Optional<MatchEvidenceCountAggregateOutputType> | number
          }
        }
      }
      ReviewDecision: {
        payload: Prisma.$ReviewDecisionPayload<ExtArgs>
        fields: Prisma.ReviewDecisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewDecisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewDecisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>
          }
          findFirst: {
            args: Prisma.ReviewDecisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewDecisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>
          }
          findMany: {
            args: Prisma.ReviewDecisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>[]
          }
          create: {
            args: Prisma.ReviewDecisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>
          }
          createMany: {
            args: Prisma.ReviewDecisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewDecisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>[]
          }
          delete: {
            args: Prisma.ReviewDecisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>
          }
          update: {
            args: Prisma.ReviewDecisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDecisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewDecisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewDecisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>[]
          }
          upsert: {
            args: Prisma.ReviewDecisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewDecisionPayload>
          }
          aggregate: {
            args: Prisma.ReviewDecisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReviewDecision>
          }
          groupBy: {
            args: Prisma.ReviewDecisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewDecisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewDecisionCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewDecisionCountAggregateOutputType> | number
          }
        }
      }
      CaseNote: {
        payload: Prisma.$CaseNotePayload<ExtArgs>
        fields: Prisma.CaseNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CaseNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CaseNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>
          }
          findFirst: {
            args: Prisma.CaseNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CaseNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>
          }
          findMany: {
            args: Prisma.CaseNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>[]
          }
          create: {
            args: Prisma.CaseNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>
          }
          createMany: {
            args: Prisma.CaseNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CaseNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>[]
          }
          delete: {
            args: Prisma.CaseNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>
          }
          update: {
            args: Prisma.CaseNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>
          }
          deleteMany: {
            args: Prisma.CaseNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CaseNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CaseNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>[]
          }
          upsert: {
            args: Prisma.CaseNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CaseNotePayload>
          }
          aggregate: {
            args: Prisma.CaseNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCaseNote>
          }
          groupBy: {
            args: Prisma.CaseNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<CaseNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.CaseNoteCountArgs<ExtArgs>
            result: $Utils.Optional<CaseNoteCountAggregateOutputType> | number
          }
        }
      }
      AuditEvent: {
        payload: Prisma.$AuditEventPayload<ExtArgs>
        fields: Prisma.AuditEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findFirst: {
            args: Prisma.AuditEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findMany: {
            args: Prisma.AuditEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          create: {
            args: Prisma.AuditEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          createMany: {
            args: Prisma.AuditEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          delete: {
            args: Prisma.AuditEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          update: {
            args: Prisma.AuditEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          deleteMany: {
            args: Prisma.AuditEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          upsert: {
            args: Prisma.AuditEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          aggregate: {
            args: Prisma.AuditEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditEvent>
          }
          groupBy: {
            args: Prisma.AuditEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditEventCountArgs<ExtArgs>
            result: $Utils.Optional<AuditEventCountAggregateOutputType> | number
          }
        }
      }
      TrendSnapshot: {
        payload: Prisma.$TrendSnapshotPayload<ExtArgs>
        fields: Prisma.TrendSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrendSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrendSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>
          }
          findFirst: {
            args: Prisma.TrendSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrendSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>
          }
          findMany: {
            args: Prisma.TrendSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>[]
          }
          create: {
            args: Prisma.TrendSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>
          }
          createMany: {
            args: Prisma.TrendSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrendSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>[]
          }
          delete: {
            args: Prisma.TrendSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>
          }
          update: {
            args: Prisma.TrendSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.TrendSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrendSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrendSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.TrendSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrendSnapshotPayload>
          }
          aggregate: {
            args: Prisma.TrendSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrendSnapshot>
          }
          groupBy: {
            args: Prisma.TrendSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrendSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrendSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<TrendSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    report?: ReportOmit
    indicator?: IndicatorOmit
    reportIndicator?: ReportIndicatorOmit
    matchEvidence?: MatchEvidenceOmit
    reviewDecision?: ReviewDecisionOmit
    caseNote?: CaseNoteOmit
    auditEvent?: AuditEventOmit
    trendSnapshot?: TrendSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    reports: number
    reviewDecisions: number
    caseNotes: number
    auditEvents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | UserCountOutputTypeCountReportsArgs
    reviewDecisions?: boolean | UserCountOutputTypeCountReviewDecisionsArgs
    caseNotes?: boolean | UserCountOutputTypeCountCaseNotesArgs
    auditEvents?: boolean | UserCountOutputTypeCountAuditEventsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewDecisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewDecisionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCaseNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseNoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEventWhereInput
  }


  /**
   * Count Type ReportCountOutputType
   */

  export type ReportCountOutputType = {
    indicators: number
    reviewDecisions: number
    caseNotes: number
    auditEvents: number
    matchesAsA: number
    matchesAsB: number
    trendSnapshots: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    indicators?: boolean | ReportCountOutputTypeCountIndicatorsArgs
    reviewDecisions?: boolean | ReportCountOutputTypeCountReviewDecisionsArgs
    caseNotes?: boolean | ReportCountOutputTypeCountCaseNotesArgs
    auditEvents?: boolean | ReportCountOutputTypeCountAuditEventsArgs
    matchesAsA?: boolean | ReportCountOutputTypeCountMatchesAsAArgs
    matchesAsB?: boolean | ReportCountOutputTypeCountMatchesAsBArgs
    trendSnapshots?: boolean | ReportCountOutputTypeCountTrendSnapshotsArgs
  }

  // Custom InputTypes
  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountIndicatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportIndicatorWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountReviewDecisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewDecisionWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountCaseNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseNoteWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountAuditEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEventWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountMatchesAsAArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchEvidenceWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountMatchesAsBArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchEvidenceWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountTrendSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrendSnapshotWhereInput
  }


  /**
   * Count Type IndicatorCountOutputType
   */

  export type IndicatorCountOutputType = {
    reports: number
  }

  export type IndicatorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | IndicatorCountOutputTypeCountReportsArgs
  }

  // Custom InputTypes
  /**
   * IndicatorCountOutputType without action
   */
  export type IndicatorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndicatorCountOutputType
     */
    select?: IndicatorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * IndicatorCountOutputType without action
   */
  export type IndicatorCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportIndicatorWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    googleId: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    googleId: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    avatarUrl: number
    googleId: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    googleId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    googleId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    googleId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    googleId: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reports?: boolean | User$reportsArgs<ExtArgs>
    reviewDecisions?: boolean | User$reviewDecisionsArgs<ExtArgs>
    caseNotes?: boolean | User$caseNotesArgs<ExtArgs>
    auditEvents?: boolean | User$auditEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "avatarUrl" | "googleId" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | User$reportsArgs<ExtArgs>
    reviewDecisions?: boolean | User$reviewDecisionsArgs<ExtArgs>
    caseNotes?: boolean | User$caseNotesArgs<ExtArgs>
    auditEvents?: boolean | User$auditEventsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      reports: Prisma.$ReportPayload<ExtArgs>[]
      reviewDecisions: Prisma.$ReviewDecisionPayload<ExtArgs>[]
      caseNotes: Prisma.$CaseNotePayload<ExtArgs>[]
      auditEvents: Prisma.$AuditEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      firstName: string | null
      lastName: string | null
      avatarUrl: string | null
      googleId: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reports<T extends User$reportsArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewDecisions<T extends User$reviewDecisionsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewDecisionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    caseNotes<T extends User$caseNotesArgs<ExtArgs> = {}>(args?: Subset<T, User$caseNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditEvents<T extends User$auditEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.reports
   */
  export type User$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.reviewDecisions
   */
  export type User$reviewDecisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    where?: ReviewDecisionWhereInput
    orderBy?: ReviewDecisionOrderByWithRelationInput | ReviewDecisionOrderByWithRelationInput[]
    cursor?: ReviewDecisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewDecisionScalarFieldEnum | ReviewDecisionScalarFieldEnum[]
  }

  /**
   * User.caseNotes
   */
  export type User$caseNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    where?: CaseNoteWhereInput
    orderBy?: CaseNoteOrderByWithRelationInput | CaseNoteOrderByWithRelationInput[]
    cursor?: CaseNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseNoteScalarFieldEnum | CaseNoteScalarFieldEnum[]
  }

  /**
   * User.auditEvents
   */
  export type User$auditEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    where?: AuditEventWhereInput
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    cursor?: AuditEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    riskScore: number | null
  }

  export type ReportSumAggregateOutputType = {
    riskScore: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    submittedById: string | null
    contentType: string | null
    rawContent: string | null
    publicSummary: string | null
    platform: string | null
    targetRegion: string | null
    riskLevel: $Enums.RiskLevel | null
    riskScore: number | null
    caveat: string | null
    status: $Enums.ReportStatus | null
    sourceType: $Enums.SourceType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    submittedById: string | null
    contentType: string | null
    rawContent: string | null
    publicSummary: string | null
    platform: string | null
    targetRegion: string | null
    riskLevel: $Enums.RiskLevel | null
    riskScore: number | null
    caveat: string | null
    status: $Enums.ReportStatus | null
    sourceType: $Enums.SourceType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    submittedById: number
    contentType: number
    rawContent: number
    publicSummary: number
    platform: number
    targetRegion: number
    riskLevel: number
    riskScore: number
    evidenceJson: number
    storyModeJson: number
    nextStepsJson: number
    caveat: number
    status: number
    sourceType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    riskScore?: true
  }

  export type ReportSumAggregateInputType = {
    riskScore?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    submittedById?: true
    contentType?: true
    rawContent?: true
    publicSummary?: true
    platform?: true
    targetRegion?: true
    riskLevel?: true
    riskScore?: true
    caveat?: true
    status?: true
    sourceType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    submittedById?: true
    contentType?: true
    rawContent?: true
    publicSummary?: true
    platform?: true
    targetRegion?: true
    riskLevel?: true
    riskScore?: true
    caveat?: true
    status?: true
    sourceType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    submittedById?: true
    contentType?: true
    rawContent?: true
    publicSummary?: true
    platform?: true
    targetRegion?: true
    riskLevel?: true
    riskScore?: true
    evidenceJson?: true
    storyModeJson?: true
    nextStepsJson?: true
    caveat?: true
    status?: true
    sourceType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    submittedById: string | null
    contentType: string
    rawContent: string
    publicSummary: string | null
    platform: string | null
    targetRegion: string | null
    riskLevel: $Enums.RiskLevel
    riskScore: number
    evidenceJson: JsonValue | null
    storyModeJson: JsonValue | null
    nextStepsJson: JsonValue | null
    caveat: string | null
    status: $Enums.ReportStatus
    sourceType: $Enums.SourceType
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedById?: boolean
    contentType?: boolean
    rawContent?: boolean
    publicSummary?: boolean
    platform?: boolean
    targetRegion?: boolean
    riskLevel?: boolean
    riskScore?: boolean
    evidenceJson?: boolean
    storyModeJson?: boolean
    nextStepsJson?: boolean
    caveat?: boolean
    status?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedBy?: boolean | Report$submittedByArgs<ExtArgs>
    indicators?: boolean | Report$indicatorsArgs<ExtArgs>
    reviewDecisions?: boolean | Report$reviewDecisionsArgs<ExtArgs>
    caseNotes?: boolean | Report$caseNotesArgs<ExtArgs>
    auditEvents?: boolean | Report$auditEventsArgs<ExtArgs>
    matchesAsA?: boolean | Report$matchesAsAArgs<ExtArgs>
    matchesAsB?: boolean | Report$matchesAsBArgs<ExtArgs>
    trendSnapshots?: boolean | Report$trendSnapshotsArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedById?: boolean
    contentType?: boolean
    rawContent?: boolean
    publicSummary?: boolean
    platform?: boolean
    targetRegion?: boolean
    riskLevel?: boolean
    riskScore?: boolean
    evidenceJson?: boolean
    storyModeJson?: boolean
    nextStepsJson?: boolean
    caveat?: boolean
    status?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedBy?: boolean | Report$submittedByArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submittedById?: boolean
    contentType?: boolean
    rawContent?: boolean
    publicSummary?: boolean
    platform?: boolean
    targetRegion?: boolean
    riskLevel?: boolean
    riskScore?: boolean
    evidenceJson?: boolean
    storyModeJson?: boolean
    nextStepsJson?: boolean
    caveat?: boolean
    status?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedBy?: boolean | Report$submittedByArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    submittedById?: boolean
    contentType?: boolean
    rawContent?: boolean
    publicSummary?: boolean
    platform?: boolean
    targetRegion?: boolean
    riskLevel?: boolean
    riskScore?: boolean
    evidenceJson?: boolean
    storyModeJson?: boolean
    nextStepsJson?: boolean
    caveat?: boolean
    status?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submittedById" | "contentType" | "rawContent" | "publicSummary" | "platform" | "targetRegion" | "riskLevel" | "riskScore" | "evidenceJson" | "storyModeJson" | "nextStepsJson" | "caveat" | "status" | "sourceType" | "createdAt" | "updatedAt", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedBy?: boolean | Report$submittedByArgs<ExtArgs>
    indicators?: boolean | Report$indicatorsArgs<ExtArgs>
    reviewDecisions?: boolean | Report$reviewDecisionsArgs<ExtArgs>
    caseNotes?: boolean | Report$caseNotesArgs<ExtArgs>
    auditEvents?: boolean | Report$auditEventsArgs<ExtArgs>
    matchesAsA?: boolean | Report$matchesAsAArgs<ExtArgs>
    matchesAsB?: boolean | Report$matchesAsBArgs<ExtArgs>
    trendSnapshots?: boolean | Report$trendSnapshotsArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedBy?: boolean | Report$submittedByArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedBy?: boolean | Report$submittedByArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      submittedBy: Prisma.$UserPayload<ExtArgs> | null
      indicators: Prisma.$ReportIndicatorPayload<ExtArgs>[]
      reviewDecisions: Prisma.$ReviewDecisionPayload<ExtArgs>[]
      caseNotes: Prisma.$CaseNotePayload<ExtArgs>[]
      auditEvents: Prisma.$AuditEventPayload<ExtArgs>[]
      matchesAsA: Prisma.$MatchEvidencePayload<ExtArgs>[]
      matchesAsB: Prisma.$MatchEvidencePayload<ExtArgs>[]
      trendSnapshots: Prisma.$TrendSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      submittedById: string | null
      contentType: string
      rawContent: string
      publicSummary: string | null
      platform: string | null
      targetRegion: string | null
      riskLevel: $Enums.RiskLevel
      riskScore: number
      evidenceJson: Prisma.JsonValue | null
      storyModeJson: Prisma.JsonValue | null
      nextStepsJson: Prisma.JsonValue | null
      caveat: string | null
      status: $Enums.ReportStatus
      sourceType: $Enums.SourceType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submittedBy<T extends Report$submittedByArgs<ExtArgs> = {}>(args?: Subset<T, Report$submittedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    indicators<T extends Report$indicatorsArgs<ExtArgs> = {}>(args?: Subset<T, Report$indicatorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviewDecisions<T extends Report$reviewDecisionsArgs<ExtArgs> = {}>(args?: Subset<T, Report$reviewDecisionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    caseNotes<T extends Report$caseNotesArgs<ExtArgs> = {}>(args?: Subset<T, Report$caseNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditEvents<T extends Report$auditEventsArgs<ExtArgs> = {}>(args?: Subset<T, Report$auditEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsA<T extends Report$matchesAsAArgs<ExtArgs> = {}>(args?: Subset<T, Report$matchesAsAArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsB<T extends Report$matchesAsBArgs<ExtArgs> = {}>(args?: Subset<T, Report$matchesAsBArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trendSnapshots<T extends Report$trendSnapshotsArgs<ExtArgs> = {}>(args?: Subset<T, Report$trendSnapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly submittedById: FieldRef<"Report", 'String'>
    readonly contentType: FieldRef<"Report", 'String'>
    readonly rawContent: FieldRef<"Report", 'String'>
    readonly publicSummary: FieldRef<"Report", 'String'>
    readonly platform: FieldRef<"Report", 'String'>
    readonly targetRegion: FieldRef<"Report", 'String'>
    readonly riskLevel: FieldRef<"Report", 'RiskLevel'>
    readonly riskScore: FieldRef<"Report", 'Float'>
    readonly evidenceJson: FieldRef<"Report", 'Json'>
    readonly storyModeJson: FieldRef<"Report", 'Json'>
    readonly nextStepsJson: FieldRef<"Report", 'Json'>
    readonly caveat: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'ReportStatus'>
    readonly sourceType: FieldRef<"Report", 'SourceType'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.submittedBy
   */
  export type Report$submittedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Report.indicators
   */
  export type Report$indicatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    where?: ReportIndicatorWhereInput
    orderBy?: ReportIndicatorOrderByWithRelationInput | ReportIndicatorOrderByWithRelationInput[]
    cursor?: ReportIndicatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportIndicatorScalarFieldEnum | ReportIndicatorScalarFieldEnum[]
  }

  /**
   * Report.reviewDecisions
   */
  export type Report$reviewDecisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    where?: ReviewDecisionWhereInput
    orderBy?: ReviewDecisionOrderByWithRelationInput | ReviewDecisionOrderByWithRelationInput[]
    cursor?: ReviewDecisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewDecisionScalarFieldEnum | ReviewDecisionScalarFieldEnum[]
  }

  /**
   * Report.caseNotes
   */
  export type Report$caseNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    where?: CaseNoteWhereInput
    orderBy?: CaseNoteOrderByWithRelationInput | CaseNoteOrderByWithRelationInput[]
    cursor?: CaseNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CaseNoteScalarFieldEnum | CaseNoteScalarFieldEnum[]
  }

  /**
   * Report.auditEvents
   */
  export type Report$auditEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    where?: AuditEventWhereInput
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    cursor?: AuditEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * Report.matchesAsA
   */
  export type Report$matchesAsAArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    where?: MatchEvidenceWhereInput
    orderBy?: MatchEvidenceOrderByWithRelationInput | MatchEvidenceOrderByWithRelationInput[]
    cursor?: MatchEvidenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchEvidenceScalarFieldEnum | MatchEvidenceScalarFieldEnum[]
  }

  /**
   * Report.matchesAsB
   */
  export type Report$matchesAsBArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    where?: MatchEvidenceWhereInput
    orderBy?: MatchEvidenceOrderByWithRelationInput | MatchEvidenceOrderByWithRelationInput[]
    cursor?: MatchEvidenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchEvidenceScalarFieldEnum | MatchEvidenceScalarFieldEnum[]
  }

  /**
   * Report.trendSnapshots
   */
  export type Report$trendSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    where?: TrendSnapshotWhereInput
    orderBy?: TrendSnapshotOrderByWithRelationInput | TrendSnapshotOrderByWithRelationInput[]
    cursor?: TrendSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrendSnapshotScalarFieldEnum | TrendSnapshotScalarFieldEnum[]
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model Indicator
   */

  export type AggregateIndicator = {
    _count: IndicatorCountAggregateOutputType | null
    _min: IndicatorMinAggregateOutputType | null
    _max: IndicatorMaxAggregateOutputType | null
  }

  export type IndicatorMinAggregateOutputType = {
    id: string | null
    type: $Enums.IndicatorType | null
    value: string | null
    createdAt: Date | null
  }

  export type IndicatorMaxAggregateOutputType = {
    id: string | null
    type: $Enums.IndicatorType | null
    value: string | null
    createdAt: Date | null
  }

  export type IndicatorCountAggregateOutputType = {
    id: number
    type: number
    value: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type IndicatorMinAggregateInputType = {
    id?: true
    type?: true
    value?: true
    createdAt?: true
  }

  export type IndicatorMaxAggregateInputType = {
    id?: true
    type?: true
    value?: true
    createdAt?: true
  }

  export type IndicatorCountAggregateInputType = {
    id?: true
    type?: true
    value?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type IndicatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Indicator to aggregate.
     */
    where?: IndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Indicators to fetch.
     */
    orderBy?: IndicatorOrderByWithRelationInput | IndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Indicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Indicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Indicators
    **/
    _count?: true | IndicatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IndicatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IndicatorMaxAggregateInputType
  }

  export type GetIndicatorAggregateType<T extends IndicatorAggregateArgs> = {
        [P in keyof T & keyof AggregateIndicator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIndicator[P]>
      : GetScalarType<T[P], AggregateIndicator[P]>
  }




  export type IndicatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IndicatorWhereInput
    orderBy?: IndicatorOrderByWithAggregationInput | IndicatorOrderByWithAggregationInput[]
    by: IndicatorScalarFieldEnum[] | IndicatorScalarFieldEnum
    having?: IndicatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IndicatorCountAggregateInputType | true
    _min?: IndicatorMinAggregateInputType
    _max?: IndicatorMaxAggregateInputType
  }

  export type IndicatorGroupByOutputType = {
    id: string
    type: $Enums.IndicatorType
    value: string
    metadata: JsonValue | null
    createdAt: Date
    _count: IndicatorCountAggregateOutputType | null
    _min: IndicatorMinAggregateOutputType | null
    _max: IndicatorMaxAggregateOutputType | null
  }

  type GetIndicatorGroupByPayload<T extends IndicatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IndicatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IndicatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IndicatorGroupByOutputType[P]>
            : GetScalarType<T[P], IndicatorGroupByOutputType[P]>
        }
      >
    >


  export type IndicatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
    reports?: boolean | Indicator$reportsArgs<ExtArgs>
    _count?: boolean | IndicatorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["indicator"]>

  export type IndicatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["indicator"]>

  export type IndicatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["indicator"]>

  export type IndicatorSelectScalar = {
    id?: boolean
    type?: boolean
    value?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type IndicatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "value" | "metadata" | "createdAt", ExtArgs["result"]["indicator"]>
  export type IndicatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | Indicator$reportsArgs<ExtArgs>
    _count?: boolean | IndicatorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type IndicatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type IndicatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $IndicatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Indicator"
    objects: {
      reports: Prisma.$ReportIndicatorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.IndicatorType
      value: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["indicator"]>
    composites: {}
  }

  type IndicatorGetPayload<S extends boolean | null | undefined | IndicatorDefaultArgs> = $Result.GetResult<Prisma.$IndicatorPayload, S>

  type IndicatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IndicatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IndicatorCountAggregateInputType | true
    }

  export interface IndicatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Indicator'], meta: { name: 'Indicator' } }
    /**
     * Find zero or one Indicator that matches the filter.
     * @param {IndicatorFindUniqueArgs} args - Arguments to find a Indicator
     * @example
     * // Get one Indicator
     * const indicator = await prisma.indicator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IndicatorFindUniqueArgs>(args: SelectSubset<T, IndicatorFindUniqueArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Indicator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IndicatorFindUniqueOrThrowArgs} args - Arguments to find a Indicator
     * @example
     * // Get one Indicator
     * const indicator = await prisma.indicator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IndicatorFindUniqueOrThrowArgs>(args: SelectSubset<T, IndicatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Indicator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicatorFindFirstArgs} args - Arguments to find a Indicator
     * @example
     * // Get one Indicator
     * const indicator = await prisma.indicator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IndicatorFindFirstArgs>(args?: SelectSubset<T, IndicatorFindFirstArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Indicator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicatorFindFirstOrThrowArgs} args - Arguments to find a Indicator
     * @example
     * // Get one Indicator
     * const indicator = await prisma.indicator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IndicatorFindFirstOrThrowArgs>(args?: SelectSubset<T, IndicatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Indicators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Indicators
     * const indicators = await prisma.indicator.findMany()
     * 
     * // Get first 10 Indicators
     * const indicators = await prisma.indicator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const indicatorWithIdOnly = await prisma.indicator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IndicatorFindManyArgs>(args?: SelectSubset<T, IndicatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Indicator.
     * @param {IndicatorCreateArgs} args - Arguments to create a Indicator.
     * @example
     * // Create one Indicator
     * const Indicator = await prisma.indicator.create({
     *   data: {
     *     // ... data to create a Indicator
     *   }
     * })
     * 
     */
    create<T extends IndicatorCreateArgs>(args: SelectSubset<T, IndicatorCreateArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Indicators.
     * @param {IndicatorCreateManyArgs} args - Arguments to create many Indicators.
     * @example
     * // Create many Indicators
     * const indicator = await prisma.indicator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IndicatorCreateManyArgs>(args?: SelectSubset<T, IndicatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Indicators and returns the data saved in the database.
     * @param {IndicatorCreateManyAndReturnArgs} args - Arguments to create many Indicators.
     * @example
     * // Create many Indicators
     * const indicator = await prisma.indicator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Indicators and only return the `id`
     * const indicatorWithIdOnly = await prisma.indicator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IndicatorCreateManyAndReturnArgs>(args?: SelectSubset<T, IndicatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Indicator.
     * @param {IndicatorDeleteArgs} args - Arguments to delete one Indicator.
     * @example
     * // Delete one Indicator
     * const Indicator = await prisma.indicator.delete({
     *   where: {
     *     // ... filter to delete one Indicator
     *   }
     * })
     * 
     */
    delete<T extends IndicatorDeleteArgs>(args: SelectSubset<T, IndicatorDeleteArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Indicator.
     * @param {IndicatorUpdateArgs} args - Arguments to update one Indicator.
     * @example
     * // Update one Indicator
     * const indicator = await prisma.indicator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IndicatorUpdateArgs>(args: SelectSubset<T, IndicatorUpdateArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Indicators.
     * @param {IndicatorDeleteManyArgs} args - Arguments to filter Indicators to delete.
     * @example
     * // Delete a few Indicators
     * const { count } = await prisma.indicator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IndicatorDeleteManyArgs>(args?: SelectSubset<T, IndicatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Indicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Indicators
     * const indicator = await prisma.indicator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IndicatorUpdateManyArgs>(args: SelectSubset<T, IndicatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Indicators and returns the data updated in the database.
     * @param {IndicatorUpdateManyAndReturnArgs} args - Arguments to update many Indicators.
     * @example
     * // Update many Indicators
     * const indicator = await prisma.indicator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Indicators and only return the `id`
     * const indicatorWithIdOnly = await prisma.indicator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IndicatorUpdateManyAndReturnArgs>(args: SelectSubset<T, IndicatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Indicator.
     * @param {IndicatorUpsertArgs} args - Arguments to update or create a Indicator.
     * @example
     * // Update or create a Indicator
     * const indicator = await prisma.indicator.upsert({
     *   create: {
     *     // ... data to create a Indicator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Indicator we want to update
     *   }
     * })
     */
    upsert<T extends IndicatorUpsertArgs>(args: SelectSubset<T, IndicatorUpsertArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Indicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicatorCountArgs} args - Arguments to filter Indicators to count.
     * @example
     * // Count the number of Indicators
     * const count = await prisma.indicator.count({
     *   where: {
     *     // ... the filter for the Indicators we want to count
     *   }
     * })
    **/
    count<T extends IndicatorCountArgs>(
      args?: Subset<T, IndicatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IndicatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Indicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IndicatorAggregateArgs>(args: Subset<T, IndicatorAggregateArgs>): Prisma.PrismaPromise<GetIndicatorAggregateType<T>>

    /**
     * Group by Indicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndicatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IndicatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IndicatorGroupByArgs['orderBy'] }
        : { orderBy?: IndicatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IndicatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndicatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Indicator model
   */
  readonly fields: IndicatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Indicator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IndicatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reports<T extends Indicator$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Indicator$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Indicator model
   */
  interface IndicatorFieldRefs {
    readonly id: FieldRef<"Indicator", 'String'>
    readonly type: FieldRef<"Indicator", 'IndicatorType'>
    readonly value: FieldRef<"Indicator", 'String'>
    readonly metadata: FieldRef<"Indicator", 'Json'>
    readonly createdAt: FieldRef<"Indicator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Indicator findUnique
   */
  export type IndicatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * Filter, which Indicator to fetch.
     */
    where: IndicatorWhereUniqueInput
  }

  /**
   * Indicator findUniqueOrThrow
   */
  export type IndicatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * Filter, which Indicator to fetch.
     */
    where: IndicatorWhereUniqueInput
  }

  /**
   * Indicator findFirst
   */
  export type IndicatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * Filter, which Indicator to fetch.
     */
    where?: IndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Indicators to fetch.
     */
    orderBy?: IndicatorOrderByWithRelationInput | IndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Indicators.
     */
    cursor?: IndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Indicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Indicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Indicators.
     */
    distinct?: IndicatorScalarFieldEnum | IndicatorScalarFieldEnum[]
  }

  /**
   * Indicator findFirstOrThrow
   */
  export type IndicatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * Filter, which Indicator to fetch.
     */
    where?: IndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Indicators to fetch.
     */
    orderBy?: IndicatorOrderByWithRelationInput | IndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Indicators.
     */
    cursor?: IndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Indicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Indicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Indicators.
     */
    distinct?: IndicatorScalarFieldEnum | IndicatorScalarFieldEnum[]
  }

  /**
   * Indicator findMany
   */
  export type IndicatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * Filter, which Indicators to fetch.
     */
    where?: IndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Indicators to fetch.
     */
    orderBy?: IndicatorOrderByWithRelationInput | IndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Indicators.
     */
    cursor?: IndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Indicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Indicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Indicators.
     */
    distinct?: IndicatorScalarFieldEnum | IndicatorScalarFieldEnum[]
  }

  /**
   * Indicator create
   */
  export type IndicatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * The data needed to create a Indicator.
     */
    data: XOR<IndicatorCreateInput, IndicatorUncheckedCreateInput>
  }

  /**
   * Indicator createMany
   */
  export type IndicatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Indicators.
     */
    data: IndicatorCreateManyInput | IndicatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Indicator createManyAndReturn
   */
  export type IndicatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * The data used to create many Indicators.
     */
    data: IndicatorCreateManyInput | IndicatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Indicator update
   */
  export type IndicatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * The data needed to update a Indicator.
     */
    data: XOR<IndicatorUpdateInput, IndicatorUncheckedUpdateInput>
    /**
     * Choose, which Indicator to update.
     */
    where: IndicatorWhereUniqueInput
  }

  /**
   * Indicator updateMany
   */
  export type IndicatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Indicators.
     */
    data: XOR<IndicatorUpdateManyMutationInput, IndicatorUncheckedUpdateManyInput>
    /**
     * Filter which Indicators to update
     */
    where?: IndicatorWhereInput
    /**
     * Limit how many Indicators to update.
     */
    limit?: number
  }

  /**
   * Indicator updateManyAndReturn
   */
  export type IndicatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * The data used to update Indicators.
     */
    data: XOR<IndicatorUpdateManyMutationInput, IndicatorUncheckedUpdateManyInput>
    /**
     * Filter which Indicators to update
     */
    where?: IndicatorWhereInput
    /**
     * Limit how many Indicators to update.
     */
    limit?: number
  }

  /**
   * Indicator upsert
   */
  export type IndicatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * The filter to search for the Indicator to update in case it exists.
     */
    where: IndicatorWhereUniqueInput
    /**
     * In case the Indicator found by the `where` argument doesn't exist, create a new Indicator with this data.
     */
    create: XOR<IndicatorCreateInput, IndicatorUncheckedCreateInput>
    /**
     * In case the Indicator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IndicatorUpdateInput, IndicatorUncheckedUpdateInput>
  }

  /**
   * Indicator delete
   */
  export type IndicatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
    /**
     * Filter which Indicator to delete.
     */
    where: IndicatorWhereUniqueInput
  }

  /**
   * Indicator deleteMany
   */
  export type IndicatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Indicators to delete
     */
    where?: IndicatorWhereInput
    /**
     * Limit how many Indicators to delete.
     */
    limit?: number
  }

  /**
   * Indicator.reports
   */
  export type Indicator$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    where?: ReportIndicatorWhereInput
    orderBy?: ReportIndicatorOrderByWithRelationInput | ReportIndicatorOrderByWithRelationInput[]
    cursor?: ReportIndicatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportIndicatorScalarFieldEnum | ReportIndicatorScalarFieldEnum[]
  }

  /**
   * Indicator without action
   */
  export type IndicatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Indicator
     */
    select?: IndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Indicator
     */
    omit?: IndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IndicatorInclude<ExtArgs> | null
  }


  /**
   * Model ReportIndicator
   */

  export type AggregateReportIndicator = {
    _count: ReportIndicatorCountAggregateOutputType | null
    _min: ReportIndicatorMinAggregateOutputType | null
    _max: ReportIndicatorMaxAggregateOutputType | null
  }

  export type ReportIndicatorMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    indicatorId: string | null
    context: string | null
  }

  export type ReportIndicatorMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    indicatorId: string | null
    context: string | null
  }

  export type ReportIndicatorCountAggregateOutputType = {
    id: number
    reportId: number
    indicatorId: number
    context: number
    _all: number
  }


  export type ReportIndicatorMinAggregateInputType = {
    id?: true
    reportId?: true
    indicatorId?: true
    context?: true
  }

  export type ReportIndicatorMaxAggregateInputType = {
    id?: true
    reportId?: true
    indicatorId?: true
    context?: true
  }

  export type ReportIndicatorCountAggregateInputType = {
    id?: true
    reportId?: true
    indicatorId?: true
    context?: true
    _all?: true
  }

  export type ReportIndicatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportIndicator to aggregate.
     */
    where?: ReportIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportIndicators to fetch.
     */
    orderBy?: ReportIndicatorOrderByWithRelationInput | ReportIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReportIndicators
    **/
    _count?: true | ReportIndicatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportIndicatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportIndicatorMaxAggregateInputType
  }

  export type GetReportIndicatorAggregateType<T extends ReportIndicatorAggregateArgs> = {
        [P in keyof T & keyof AggregateReportIndicator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReportIndicator[P]>
      : GetScalarType<T[P], AggregateReportIndicator[P]>
  }




  export type ReportIndicatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportIndicatorWhereInput
    orderBy?: ReportIndicatorOrderByWithAggregationInput | ReportIndicatorOrderByWithAggregationInput[]
    by: ReportIndicatorScalarFieldEnum[] | ReportIndicatorScalarFieldEnum
    having?: ReportIndicatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportIndicatorCountAggregateInputType | true
    _min?: ReportIndicatorMinAggregateInputType
    _max?: ReportIndicatorMaxAggregateInputType
  }

  export type ReportIndicatorGroupByOutputType = {
    id: string
    reportId: string
    indicatorId: string
    context: string | null
    _count: ReportIndicatorCountAggregateOutputType | null
    _min: ReportIndicatorMinAggregateOutputType | null
    _max: ReportIndicatorMaxAggregateOutputType | null
  }

  type GetReportIndicatorGroupByPayload<T extends ReportIndicatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportIndicatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportIndicatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportIndicatorGroupByOutputType[P]>
            : GetScalarType<T[P], ReportIndicatorGroupByOutputType[P]>
        }
      >
    >


  export type ReportIndicatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    indicatorId?: boolean
    context?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    indicator?: boolean | IndicatorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reportIndicator"]>

  export type ReportIndicatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    indicatorId?: boolean
    context?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    indicator?: boolean | IndicatorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reportIndicator"]>

  export type ReportIndicatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    indicatorId?: boolean
    context?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    indicator?: boolean | IndicatorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reportIndicator"]>

  export type ReportIndicatorSelectScalar = {
    id?: boolean
    reportId?: boolean
    indicatorId?: boolean
    context?: boolean
  }

  export type ReportIndicatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportId" | "indicatorId" | "context", ExtArgs["result"]["reportIndicator"]>
  export type ReportIndicatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    indicator?: boolean | IndicatorDefaultArgs<ExtArgs>
  }
  export type ReportIndicatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    indicator?: boolean | IndicatorDefaultArgs<ExtArgs>
  }
  export type ReportIndicatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    indicator?: boolean | IndicatorDefaultArgs<ExtArgs>
  }

  export type $ReportIndicatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReportIndicator"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs>
      indicator: Prisma.$IndicatorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      indicatorId: string
      context: string | null
    }, ExtArgs["result"]["reportIndicator"]>
    composites: {}
  }

  type ReportIndicatorGetPayload<S extends boolean | null | undefined | ReportIndicatorDefaultArgs> = $Result.GetResult<Prisma.$ReportIndicatorPayload, S>

  type ReportIndicatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportIndicatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportIndicatorCountAggregateInputType | true
    }

  export interface ReportIndicatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReportIndicator'], meta: { name: 'ReportIndicator' } }
    /**
     * Find zero or one ReportIndicator that matches the filter.
     * @param {ReportIndicatorFindUniqueArgs} args - Arguments to find a ReportIndicator
     * @example
     * // Get one ReportIndicator
     * const reportIndicator = await prisma.reportIndicator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportIndicatorFindUniqueArgs>(args: SelectSubset<T, ReportIndicatorFindUniqueArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReportIndicator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportIndicatorFindUniqueOrThrowArgs} args - Arguments to find a ReportIndicator
     * @example
     * // Get one ReportIndicator
     * const reportIndicator = await prisma.reportIndicator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportIndicatorFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportIndicatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReportIndicator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportIndicatorFindFirstArgs} args - Arguments to find a ReportIndicator
     * @example
     * // Get one ReportIndicator
     * const reportIndicator = await prisma.reportIndicator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportIndicatorFindFirstArgs>(args?: SelectSubset<T, ReportIndicatorFindFirstArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReportIndicator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportIndicatorFindFirstOrThrowArgs} args - Arguments to find a ReportIndicator
     * @example
     * // Get one ReportIndicator
     * const reportIndicator = await prisma.reportIndicator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportIndicatorFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportIndicatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReportIndicators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportIndicatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReportIndicators
     * const reportIndicators = await prisma.reportIndicator.findMany()
     * 
     * // Get first 10 ReportIndicators
     * const reportIndicators = await prisma.reportIndicator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportIndicatorWithIdOnly = await prisma.reportIndicator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportIndicatorFindManyArgs>(args?: SelectSubset<T, ReportIndicatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReportIndicator.
     * @param {ReportIndicatorCreateArgs} args - Arguments to create a ReportIndicator.
     * @example
     * // Create one ReportIndicator
     * const ReportIndicator = await prisma.reportIndicator.create({
     *   data: {
     *     // ... data to create a ReportIndicator
     *   }
     * })
     * 
     */
    create<T extends ReportIndicatorCreateArgs>(args: SelectSubset<T, ReportIndicatorCreateArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReportIndicators.
     * @param {ReportIndicatorCreateManyArgs} args - Arguments to create many ReportIndicators.
     * @example
     * // Create many ReportIndicators
     * const reportIndicator = await prisma.reportIndicator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportIndicatorCreateManyArgs>(args?: SelectSubset<T, ReportIndicatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReportIndicators and returns the data saved in the database.
     * @param {ReportIndicatorCreateManyAndReturnArgs} args - Arguments to create many ReportIndicators.
     * @example
     * // Create many ReportIndicators
     * const reportIndicator = await prisma.reportIndicator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReportIndicators and only return the `id`
     * const reportIndicatorWithIdOnly = await prisma.reportIndicator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportIndicatorCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportIndicatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReportIndicator.
     * @param {ReportIndicatorDeleteArgs} args - Arguments to delete one ReportIndicator.
     * @example
     * // Delete one ReportIndicator
     * const ReportIndicator = await prisma.reportIndicator.delete({
     *   where: {
     *     // ... filter to delete one ReportIndicator
     *   }
     * })
     * 
     */
    delete<T extends ReportIndicatorDeleteArgs>(args: SelectSubset<T, ReportIndicatorDeleteArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReportIndicator.
     * @param {ReportIndicatorUpdateArgs} args - Arguments to update one ReportIndicator.
     * @example
     * // Update one ReportIndicator
     * const reportIndicator = await prisma.reportIndicator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportIndicatorUpdateArgs>(args: SelectSubset<T, ReportIndicatorUpdateArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReportIndicators.
     * @param {ReportIndicatorDeleteManyArgs} args - Arguments to filter ReportIndicators to delete.
     * @example
     * // Delete a few ReportIndicators
     * const { count } = await prisma.reportIndicator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportIndicatorDeleteManyArgs>(args?: SelectSubset<T, ReportIndicatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportIndicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportIndicatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReportIndicators
     * const reportIndicator = await prisma.reportIndicator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportIndicatorUpdateManyArgs>(args: SelectSubset<T, ReportIndicatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportIndicators and returns the data updated in the database.
     * @param {ReportIndicatorUpdateManyAndReturnArgs} args - Arguments to update many ReportIndicators.
     * @example
     * // Update many ReportIndicators
     * const reportIndicator = await prisma.reportIndicator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReportIndicators and only return the `id`
     * const reportIndicatorWithIdOnly = await prisma.reportIndicator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportIndicatorUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportIndicatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReportIndicator.
     * @param {ReportIndicatorUpsertArgs} args - Arguments to update or create a ReportIndicator.
     * @example
     * // Update or create a ReportIndicator
     * const reportIndicator = await prisma.reportIndicator.upsert({
     *   create: {
     *     // ... data to create a ReportIndicator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReportIndicator we want to update
     *   }
     * })
     */
    upsert<T extends ReportIndicatorUpsertArgs>(args: SelectSubset<T, ReportIndicatorUpsertArgs<ExtArgs>>): Prisma__ReportIndicatorClient<$Result.GetResult<Prisma.$ReportIndicatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReportIndicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportIndicatorCountArgs} args - Arguments to filter ReportIndicators to count.
     * @example
     * // Count the number of ReportIndicators
     * const count = await prisma.reportIndicator.count({
     *   where: {
     *     // ... the filter for the ReportIndicators we want to count
     *   }
     * })
    **/
    count<T extends ReportIndicatorCountArgs>(
      args?: Subset<T, ReportIndicatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportIndicatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReportIndicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportIndicatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportIndicatorAggregateArgs>(args: Subset<T, ReportIndicatorAggregateArgs>): Prisma.PrismaPromise<GetReportIndicatorAggregateType<T>>

    /**
     * Group by ReportIndicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportIndicatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportIndicatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportIndicatorGroupByArgs['orderBy'] }
        : { orderBy?: ReportIndicatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportIndicatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportIndicatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReportIndicator model
   */
  readonly fields: ReportIndicatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReportIndicator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportIndicatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    indicator<T extends IndicatorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, IndicatorDefaultArgs<ExtArgs>>): Prisma__IndicatorClient<$Result.GetResult<Prisma.$IndicatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReportIndicator model
   */
  interface ReportIndicatorFieldRefs {
    readonly id: FieldRef<"ReportIndicator", 'String'>
    readonly reportId: FieldRef<"ReportIndicator", 'String'>
    readonly indicatorId: FieldRef<"ReportIndicator", 'String'>
    readonly context: FieldRef<"ReportIndicator", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ReportIndicator findUnique
   */
  export type ReportIndicatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which ReportIndicator to fetch.
     */
    where: ReportIndicatorWhereUniqueInput
  }

  /**
   * ReportIndicator findUniqueOrThrow
   */
  export type ReportIndicatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which ReportIndicator to fetch.
     */
    where: ReportIndicatorWhereUniqueInput
  }

  /**
   * ReportIndicator findFirst
   */
  export type ReportIndicatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which ReportIndicator to fetch.
     */
    where?: ReportIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportIndicators to fetch.
     */
    orderBy?: ReportIndicatorOrderByWithRelationInput | ReportIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportIndicators.
     */
    cursor?: ReportIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportIndicators.
     */
    distinct?: ReportIndicatorScalarFieldEnum | ReportIndicatorScalarFieldEnum[]
  }

  /**
   * ReportIndicator findFirstOrThrow
   */
  export type ReportIndicatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which ReportIndicator to fetch.
     */
    where?: ReportIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportIndicators to fetch.
     */
    orderBy?: ReportIndicatorOrderByWithRelationInput | ReportIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportIndicators.
     */
    cursor?: ReportIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportIndicators.
     */
    distinct?: ReportIndicatorScalarFieldEnum | ReportIndicatorScalarFieldEnum[]
  }

  /**
   * ReportIndicator findMany
   */
  export type ReportIndicatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which ReportIndicators to fetch.
     */
    where?: ReportIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportIndicators to fetch.
     */
    orderBy?: ReportIndicatorOrderByWithRelationInput | ReportIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReportIndicators.
     */
    cursor?: ReportIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportIndicators.
     */
    distinct?: ReportIndicatorScalarFieldEnum | ReportIndicatorScalarFieldEnum[]
  }

  /**
   * ReportIndicator create
   */
  export type ReportIndicatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * The data needed to create a ReportIndicator.
     */
    data: XOR<ReportIndicatorCreateInput, ReportIndicatorUncheckedCreateInput>
  }

  /**
   * ReportIndicator createMany
   */
  export type ReportIndicatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReportIndicators.
     */
    data: ReportIndicatorCreateManyInput | ReportIndicatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReportIndicator createManyAndReturn
   */
  export type ReportIndicatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * The data used to create many ReportIndicators.
     */
    data: ReportIndicatorCreateManyInput | ReportIndicatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReportIndicator update
   */
  export type ReportIndicatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * The data needed to update a ReportIndicator.
     */
    data: XOR<ReportIndicatorUpdateInput, ReportIndicatorUncheckedUpdateInput>
    /**
     * Choose, which ReportIndicator to update.
     */
    where: ReportIndicatorWhereUniqueInput
  }

  /**
   * ReportIndicator updateMany
   */
  export type ReportIndicatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReportIndicators.
     */
    data: XOR<ReportIndicatorUpdateManyMutationInput, ReportIndicatorUncheckedUpdateManyInput>
    /**
     * Filter which ReportIndicators to update
     */
    where?: ReportIndicatorWhereInput
    /**
     * Limit how many ReportIndicators to update.
     */
    limit?: number
  }

  /**
   * ReportIndicator updateManyAndReturn
   */
  export type ReportIndicatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * The data used to update ReportIndicators.
     */
    data: XOR<ReportIndicatorUpdateManyMutationInput, ReportIndicatorUncheckedUpdateManyInput>
    /**
     * Filter which ReportIndicators to update
     */
    where?: ReportIndicatorWhereInput
    /**
     * Limit how many ReportIndicators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReportIndicator upsert
   */
  export type ReportIndicatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * The filter to search for the ReportIndicator to update in case it exists.
     */
    where: ReportIndicatorWhereUniqueInput
    /**
     * In case the ReportIndicator found by the `where` argument doesn't exist, create a new ReportIndicator with this data.
     */
    create: XOR<ReportIndicatorCreateInput, ReportIndicatorUncheckedCreateInput>
    /**
     * In case the ReportIndicator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportIndicatorUpdateInput, ReportIndicatorUncheckedUpdateInput>
  }

  /**
   * ReportIndicator delete
   */
  export type ReportIndicatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
    /**
     * Filter which ReportIndicator to delete.
     */
    where: ReportIndicatorWhereUniqueInput
  }

  /**
   * ReportIndicator deleteMany
   */
  export type ReportIndicatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportIndicators to delete
     */
    where?: ReportIndicatorWhereInput
    /**
     * Limit how many ReportIndicators to delete.
     */
    limit?: number
  }

  /**
   * ReportIndicator without action
   */
  export type ReportIndicatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportIndicator
     */
    select?: ReportIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportIndicator
     */
    omit?: ReportIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIndicatorInclude<ExtArgs> | null
  }


  /**
   * Model MatchEvidence
   */

  export type AggregateMatchEvidence = {
    _count: MatchEvidenceCountAggregateOutputType | null
    _avg: MatchEvidenceAvgAggregateOutputType | null
    _sum: MatchEvidenceSumAggregateOutputType | null
    _min: MatchEvidenceMinAggregateOutputType | null
    _max: MatchEvidenceMaxAggregateOutputType | null
  }

  export type MatchEvidenceAvgAggregateOutputType = {
    similarityScore: number | null
  }

  export type MatchEvidenceSumAggregateOutputType = {
    similarityScore: number | null
  }

  export type MatchEvidenceMinAggregateOutputType = {
    id: string | null
    reportAId: string | null
    reportBId: string | null
    similarityScore: number | null
    createdAt: Date | null
  }

  export type MatchEvidenceMaxAggregateOutputType = {
    id: string | null
    reportAId: string | null
    reportBId: string | null
    similarityScore: number | null
    createdAt: Date | null
  }

  export type MatchEvidenceCountAggregateOutputType = {
    id: number
    reportAId: number
    reportBId: number
    similarityScore: number
    matchedClues: number
    differences: number
    createdAt: number
    _all: number
  }


  export type MatchEvidenceAvgAggregateInputType = {
    similarityScore?: true
  }

  export type MatchEvidenceSumAggregateInputType = {
    similarityScore?: true
  }

  export type MatchEvidenceMinAggregateInputType = {
    id?: true
    reportAId?: true
    reportBId?: true
    similarityScore?: true
    createdAt?: true
  }

  export type MatchEvidenceMaxAggregateInputType = {
    id?: true
    reportAId?: true
    reportBId?: true
    similarityScore?: true
    createdAt?: true
  }

  export type MatchEvidenceCountAggregateInputType = {
    id?: true
    reportAId?: true
    reportBId?: true
    similarityScore?: true
    matchedClues?: true
    differences?: true
    createdAt?: true
    _all?: true
  }

  export type MatchEvidenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchEvidence to aggregate.
     */
    where?: MatchEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvidences to fetch.
     */
    orderBy?: MatchEvidenceOrderByWithRelationInput | MatchEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchEvidences
    **/
    _count?: true | MatchEvidenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchEvidenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchEvidenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchEvidenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchEvidenceMaxAggregateInputType
  }

  export type GetMatchEvidenceAggregateType<T extends MatchEvidenceAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchEvidence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchEvidence[P]>
      : GetScalarType<T[P], AggregateMatchEvidence[P]>
  }




  export type MatchEvidenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchEvidenceWhereInput
    orderBy?: MatchEvidenceOrderByWithAggregationInput | MatchEvidenceOrderByWithAggregationInput[]
    by: MatchEvidenceScalarFieldEnum[] | MatchEvidenceScalarFieldEnum
    having?: MatchEvidenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchEvidenceCountAggregateInputType | true
    _avg?: MatchEvidenceAvgAggregateInputType
    _sum?: MatchEvidenceSumAggregateInputType
    _min?: MatchEvidenceMinAggregateInputType
    _max?: MatchEvidenceMaxAggregateInputType
  }

  export type MatchEvidenceGroupByOutputType = {
    id: string
    reportAId: string
    reportBId: string
    similarityScore: number
    matchedClues: JsonValue
    differences: JsonValue
    createdAt: Date
    _count: MatchEvidenceCountAggregateOutputType | null
    _avg: MatchEvidenceAvgAggregateOutputType | null
    _sum: MatchEvidenceSumAggregateOutputType | null
    _min: MatchEvidenceMinAggregateOutputType | null
    _max: MatchEvidenceMaxAggregateOutputType | null
  }

  type GetMatchEvidenceGroupByPayload<T extends MatchEvidenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchEvidenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchEvidenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchEvidenceGroupByOutputType[P]>
            : GetScalarType<T[P], MatchEvidenceGroupByOutputType[P]>
        }
      >
    >


  export type MatchEvidenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportAId?: boolean
    reportBId?: boolean
    similarityScore?: boolean
    matchedClues?: boolean
    differences?: boolean
    createdAt?: boolean
    reportA?: boolean | ReportDefaultArgs<ExtArgs>
    reportB?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchEvidence"]>

  export type MatchEvidenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportAId?: boolean
    reportBId?: boolean
    similarityScore?: boolean
    matchedClues?: boolean
    differences?: boolean
    createdAt?: boolean
    reportA?: boolean | ReportDefaultArgs<ExtArgs>
    reportB?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchEvidence"]>

  export type MatchEvidenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportAId?: boolean
    reportBId?: boolean
    similarityScore?: boolean
    matchedClues?: boolean
    differences?: boolean
    createdAt?: boolean
    reportA?: boolean | ReportDefaultArgs<ExtArgs>
    reportB?: boolean | ReportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchEvidence"]>

  export type MatchEvidenceSelectScalar = {
    id?: boolean
    reportAId?: boolean
    reportBId?: boolean
    similarityScore?: boolean
    matchedClues?: boolean
    differences?: boolean
    createdAt?: boolean
  }

  export type MatchEvidenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportAId" | "reportBId" | "similarityScore" | "matchedClues" | "differences" | "createdAt", ExtArgs["result"]["matchEvidence"]>
  export type MatchEvidenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reportA?: boolean | ReportDefaultArgs<ExtArgs>
    reportB?: boolean | ReportDefaultArgs<ExtArgs>
  }
  export type MatchEvidenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reportA?: boolean | ReportDefaultArgs<ExtArgs>
    reportB?: boolean | ReportDefaultArgs<ExtArgs>
  }
  export type MatchEvidenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reportA?: boolean | ReportDefaultArgs<ExtArgs>
    reportB?: boolean | ReportDefaultArgs<ExtArgs>
  }

  export type $MatchEvidencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchEvidence"
    objects: {
      reportA: Prisma.$ReportPayload<ExtArgs>
      reportB: Prisma.$ReportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportAId: string
      reportBId: string
      similarityScore: number
      matchedClues: Prisma.JsonValue
      differences: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["matchEvidence"]>
    composites: {}
  }

  type MatchEvidenceGetPayload<S extends boolean | null | undefined | MatchEvidenceDefaultArgs> = $Result.GetResult<Prisma.$MatchEvidencePayload, S>

  type MatchEvidenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchEvidenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchEvidenceCountAggregateInputType | true
    }

  export interface MatchEvidenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchEvidence'], meta: { name: 'MatchEvidence' } }
    /**
     * Find zero or one MatchEvidence that matches the filter.
     * @param {MatchEvidenceFindUniqueArgs} args - Arguments to find a MatchEvidence
     * @example
     * // Get one MatchEvidence
     * const matchEvidence = await prisma.matchEvidence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchEvidenceFindUniqueArgs>(args: SelectSubset<T, MatchEvidenceFindUniqueArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchEvidence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchEvidenceFindUniqueOrThrowArgs} args - Arguments to find a MatchEvidence
     * @example
     * // Get one MatchEvidence
     * const matchEvidence = await prisma.matchEvidence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchEvidenceFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchEvidenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchEvidence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEvidenceFindFirstArgs} args - Arguments to find a MatchEvidence
     * @example
     * // Get one MatchEvidence
     * const matchEvidence = await prisma.matchEvidence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchEvidenceFindFirstArgs>(args?: SelectSubset<T, MatchEvidenceFindFirstArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchEvidence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEvidenceFindFirstOrThrowArgs} args - Arguments to find a MatchEvidence
     * @example
     * // Get one MatchEvidence
     * const matchEvidence = await prisma.matchEvidence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchEvidenceFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchEvidenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchEvidences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEvidenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchEvidences
     * const matchEvidences = await prisma.matchEvidence.findMany()
     * 
     * // Get first 10 MatchEvidences
     * const matchEvidences = await prisma.matchEvidence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchEvidenceWithIdOnly = await prisma.matchEvidence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchEvidenceFindManyArgs>(args?: SelectSubset<T, MatchEvidenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchEvidence.
     * @param {MatchEvidenceCreateArgs} args - Arguments to create a MatchEvidence.
     * @example
     * // Create one MatchEvidence
     * const MatchEvidence = await prisma.matchEvidence.create({
     *   data: {
     *     // ... data to create a MatchEvidence
     *   }
     * })
     * 
     */
    create<T extends MatchEvidenceCreateArgs>(args: SelectSubset<T, MatchEvidenceCreateArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchEvidences.
     * @param {MatchEvidenceCreateManyArgs} args - Arguments to create many MatchEvidences.
     * @example
     * // Create many MatchEvidences
     * const matchEvidence = await prisma.matchEvidence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchEvidenceCreateManyArgs>(args?: SelectSubset<T, MatchEvidenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchEvidences and returns the data saved in the database.
     * @param {MatchEvidenceCreateManyAndReturnArgs} args - Arguments to create many MatchEvidences.
     * @example
     * // Create many MatchEvidences
     * const matchEvidence = await prisma.matchEvidence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchEvidences and only return the `id`
     * const matchEvidenceWithIdOnly = await prisma.matchEvidence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchEvidenceCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchEvidenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchEvidence.
     * @param {MatchEvidenceDeleteArgs} args - Arguments to delete one MatchEvidence.
     * @example
     * // Delete one MatchEvidence
     * const MatchEvidence = await prisma.matchEvidence.delete({
     *   where: {
     *     // ... filter to delete one MatchEvidence
     *   }
     * })
     * 
     */
    delete<T extends MatchEvidenceDeleteArgs>(args: SelectSubset<T, MatchEvidenceDeleteArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchEvidence.
     * @param {MatchEvidenceUpdateArgs} args - Arguments to update one MatchEvidence.
     * @example
     * // Update one MatchEvidence
     * const matchEvidence = await prisma.matchEvidence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchEvidenceUpdateArgs>(args: SelectSubset<T, MatchEvidenceUpdateArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchEvidences.
     * @param {MatchEvidenceDeleteManyArgs} args - Arguments to filter MatchEvidences to delete.
     * @example
     * // Delete a few MatchEvidences
     * const { count } = await prisma.matchEvidence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchEvidenceDeleteManyArgs>(args?: SelectSubset<T, MatchEvidenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchEvidences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEvidenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchEvidences
     * const matchEvidence = await prisma.matchEvidence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchEvidenceUpdateManyArgs>(args: SelectSubset<T, MatchEvidenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchEvidences and returns the data updated in the database.
     * @param {MatchEvidenceUpdateManyAndReturnArgs} args - Arguments to update many MatchEvidences.
     * @example
     * // Update many MatchEvidences
     * const matchEvidence = await prisma.matchEvidence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchEvidences and only return the `id`
     * const matchEvidenceWithIdOnly = await prisma.matchEvidence.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchEvidenceUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchEvidenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchEvidence.
     * @param {MatchEvidenceUpsertArgs} args - Arguments to update or create a MatchEvidence.
     * @example
     * // Update or create a MatchEvidence
     * const matchEvidence = await prisma.matchEvidence.upsert({
     *   create: {
     *     // ... data to create a MatchEvidence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchEvidence we want to update
     *   }
     * })
     */
    upsert<T extends MatchEvidenceUpsertArgs>(args: SelectSubset<T, MatchEvidenceUpsertArgs<ExtArgs>>): Prisma__MatchEvidenceClient<$Result.GetResult<Prisma.$MatchEvidencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchEvidences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEvidenceCountArgs} args - Arguments to filter MatchEvidences to count.
     * @example
     * // Count the number of MatchEvidences
     * const count = await prisma.matchEvidence.count({
     *   where: {
     *     // ... the filter for the MatchEvidences we want to count
     *   }
     * })
    **/
    count<T extends MatchEvidenceCountArgs>(
      args?: Subset<T, MatchEvidenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchEvidenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchEvidence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEvidenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchEvidenceAggregateArgs>(args: Subset<T, MatchEvidenceAggregateArgs>): Prisma.PrismaPromise<GetMatchEvidenceAggregateType<T>>

    /**
     * Group by MatchEvidence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchEvidenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchEvidenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchEvidenceGroupByArgs['orderBy'] }
        : { orderBy?: MatchEvidenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchEvidenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchEvidenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchEvidence model
   */
  readonly fields: MatchEvidenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchEvidence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchEvidenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reportA<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reportB<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchEvidence model
   */
  interface MatchEvidenceFieldRefs {
    readonly id: FieldRef<"MatchEvidence", 'String'>
    readonly reportAId: FieldRef<"MatchEvidence", 'String'>
    readonly reportBId: FieldRef<"MatchEvidence", 'String'>
    readonly similarityScore: FieldRef<"MatchEvidence", 'Float'>
    readonly matchedClues: FieldRef<"MatchEvidence", 'Json'>
    readonly differences: FieldRef<"MatchEvidence", 'Json'>
    readonly createdAt: FieldRef<"MatchEvidence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchEvidence findUnique
   */
  export type MatchEvidenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvidence to fetch.
     */
    where: MatchEvidenceWhereUniqueInput
  }

  /**
   * MatchEvidence findUniqueOrThrow
   */
  export type MatchEvidenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvidence to fetch.
     */
    where: MatchEvidenceWhereUniqueInput
  }

  /**
   * MatchEvidence findFirst
   */
  export type MatchEvidenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvidence to fetch.
     */
    where?: MatchEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvidences to fetch.
     */
    orderBy?: MatchEvidenceOrderByWithRelationInput | MatchEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchEvidences.
     */
    cursor?: MatchEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchEvidences.
     */
    distinct?: MatchEvidenceScalarFieldEnum | MatchEvidenceScalarFieldEnum[]
  }

  /**
   * MatchEvidence findFirstOrThrow
   */
  export type MatchEvidenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvidence to fetch.
     */
    where?: MatchEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvidences to fetch.
     */
    orderBy?: MatchEvidenceOrderByWithRelationInput | MatchEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchEvidences.
     */
    cursor?: MatchEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchEvidences.
     */
    distinct?: MatchEvidenceScalarFieldEnum | MatchEvidenceScalarFieldEnum[]
  }

  /**
   * MatchEvidence findMany
   */
  export type MatchEvidenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * Filter, which MatchEvidences to fetch.
     */
    where?: MatchEvidenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchEvidences to fetch.
     */
    orderBy?: MatchEvidenceOrderByWithRelationInput | MatchEvidenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchEvidences.
     */
    cursor?: MatchEvidenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchEvidences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchEvidences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchEvidences.
     */
    distinct?: MatchEvidenceScalarFieldEnum | MatchEvidenceScalarFieldEnum[]
  }

  /**
   * MatchEvidence create
   */
  export type MatchEvidenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchEvidence.
     */
    data: XOR<MatchEvidenceCreateInput, MatchEvidenceUncheckedCreateInput>
  }

  /**
   * MatchEvidence createMany
   */
  export type MatchEvidenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchEvidences.
     */
    data: MatchEvidenceCreateManyInput | MatchEvidenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchEvidence createManyAndReturn
   */
  export type MatchEvidenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * The data used to create many MatchEvidences.
     */
    data: MatchEvidenceCreateManyInput | MatchEvidenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchEvidence update
   */
  export type MatchEvidenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchEvidence.
     */
    data: XOR<MatchEvidenceUpdateInput, MatchEvidenceUncheckedUpdateInput>
    /**
     * Choose, which MatchEvidence to update.
     */
    where: MatchEvidenceWhereUniqueInput
  }

  /**
   * MatchEvidence updateMany
   */
  export type MatchEvidenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchEvidences.
     */
    data: XOR<MatchEvidenceUpdateManyMutationInput, MatchEvidenceUncheckedUpdateManyInput>
    /**
     * Filter which MatchEvidences to update
     */
    where?: MatchEvidenceWhereInput
    /**
     * Limit how many MatchEvidences to update.
     */
    limit?: number
  }

  /**
   * MatchEvidence updateManyAndReturn
   */
  export type MatchEvidenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * The data used to update MatchEvidences.
     */
    data: XOR<MatchEvidenceUpdateManyMutationInput, MatchEvidenceUncheckedUpdateManyInput>
    /**
     * Filter which MatchEvidences to update
     */
    where?: MatchEvidenceWhereInput
    /**
     * Limit how many MatchEvidences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchEvidence upsert
   */
  export type MatchEvidenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchEvidence to update in case it exists.
     */
    where: MatchEvidenceWhereUniqueInput
    /**
     * In case the MatchEvidence found by the `where` argument doesn't exist, create a new MatchEvidence with this data.
     */
    create: XOR<MatchEvidenceCreateInput, MatchEvidenceUncheckedCreateInput>
    /**
     * In case the MatchEvidence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchEvidenceUpdateInput, MatchEvidenceUncheckedUpdateInput>
  }

  /**
   * MatchEvidence delete
   */
  export type MatchEvidenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
    /**
     * Filter which MatchEvidence to delete.
     */
    where: MatchEvidenceWhereUniqueInput
  }

  /**
   * MatchEvidence deleteMany
   */
  export type MatchEvidenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchEvidences to delete
     */
    where?: MatchEvidenceWhereInput
    /**
     * Limit how many MatchEvidences to delete.
     */
    limit?: number
  }

  /**
   * MatchEvidence without action
   */
  export type MatchEvidenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchEvidence
     */
    select?: MatchEvidenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchEvidence
     */
    omit?: MatchEvidenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchEvidenceInclude<ExtArgs> | null
  }


  /**
   * Model ReviewDecision
   */

  export type AggregateReviewDecision = {
    _count: ReviewDecisionCountAggregateOutputType | null
    _min: ReviewDecisionMinAggregateOutputType | null
    _max: ReviewDecisionMaxAggregateOutputType | null
  }

  export type ReviewDecisionMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    reviewerId: string | null
    status: $Enums.ReportStatus | null
    rationale: string | null
    createdAt: Date | null
  }

  export type ReviewDecisionMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    reviewerId: string | null
    status: $Enums.ReportStatus | null
    rationale: string | null
    createdAt: Date | null
  }

  export type ReviewDecisionCountAggregateOutputType = {
    id: number
    reportId: number
    reviewerId: number
    status: number
    rationale: number
    redactions: number
    createdAt: number
    _all: number
  }


  export type ReviewDecisionMinAggregateInputType = {
    id?: true
    reportId?: true
    reviewerId?: true
    status?: true
    rationale?: true
    createdAt?: true
  }

  export type ReviewDecisionMaxAggregateInputType = {
    id?: true
    reportId?: true
    reviewerId?: true
    status?: true
    rationale?: true
    createdAt?: true
  }

  export type ReviewDecisionCountAggregateInputType = {
    id?: true
    reportId?: true
    reviewerId?: true
    status?: true
    rationale?: true
    redactions?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewDecisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewDecision to aggregate.
     */
    where?: ReviewDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewDecisions to fetch.
     */
    orderBy?: ReviewDecisionOrderByWithRelationInput | ReviewDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReviewDecisions
    **/
    _count?: true | ReviewDecisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewDecisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewDecisionMaxAggregateInputType
  }

  export type GetReviewDecisionAggregateType<T extends ReviewDecisionAggregateArgs> = {
        [P in keyof T & keyof AggregateReviewDecision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviewDecision[P]>
      : GetScalarType<T[P], AggregateReviewDecision[P]>
  }




  export type ReviewDecisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewDecisionWhereInput
    orderBy?: ReviewDecisionOrderByWithAggregationInput | ReviewDecisionOrderByWithAggregationInput[]
    by: ReviewDecisionScalarFieldEnum[] | ReviewDecisionScalarFieldEnum
    having?: ReviewDecisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewDecisionCountAggregateInputType | true
    _min?: ReviewDecisionMinAggregateInputType
    _max?: ReviewDecisionMaxAggregateInputType
  }

  export type ReviewDecisionGroupByOutputType = {
    id: string
    reportId: string
    reviewerId: string
    status: $Enums.ReportStatus
    rationale: string
    redactions: JsonValue | null
    createdAt: Date
    _count: ReviewDecisionCountAggregateOutputType | null
    _min: ReviewDecisionMinAggregateOutputType | null
    _max: ReviewDecisionMaxAggregateOutputType | null
  }

  type GetReviewDecisionGroupByPayload<T extends ReviewDecisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewDecisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewDecisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewDecisionGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewDecisionGroupByOutputType[P]>
        }
      >
    >


  export type ReviewDecisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    reviewerId?: boolean
    status?: boolean
    rationale?: boolean
    redactions?: boolean
    createdAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewDecision"]>

  export type ReviewDecisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    reviewerId?: boolean
    status?: boolean
    rationale?: boolean
    redactions?: boolean
    createdAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewDecision"]>

  export type ReviewDecisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    reviewerId?: boolean
    status?: boolean
    rationale?: boolean
    redactions?: boolean
    createdAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewDecision"]>

  export type ReviewDecisionSelectScalar = {
    id?: boolean
    reportId?: boolean
    reviewerId?: boolean
    status?: boolean
    rationale?: boolean
    redactions?: boolean
    createdAt?: boolean
  }

  export type ReviewDecisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportId" | "reviewerId" | "status" | "rationale" | "redactions" | "createdAt", ExtArgs["result"]["reviewDecision"]>
  export type ReviewDecisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewDecisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewDecisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    reviewer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewDecisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReviewDecision"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs>
      reviewer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      reviewerId: string
      status: $Enums.ReportStatus
      rationale: string
      redactions: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["reviewDecision"]>
    composites: {}
  }

  type ReviewDecisionGetPayload<S extends boolean | null | undefined | ReviewDecisionDefaultArgs> = $Result.GetResult<Prisma.$ReviewDecisionPayload, S>

  type ReviewDecisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewDecisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewDecisionCountAggregateInputType | true
    }

  export interface ReviewDecisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReviewDecision'], meta: { name: 'ReviewDecision' } }
    /**
     * Find zero or one ReviewDecision that matches the filter.
     * @param {ReviewDecisionFindUniqueArgs} args - Arguments to find a ReviewDecision
     * @example
     * // Get one ReviewDecision
     * const reviewDecision = await prisma.reviewDecision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewDecisionFindUniqueArgs>(args: SelectSubset<T, ReviewDecisionFindUniqueArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReviewDecision that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewDecisionFindUniqueOrThrowArgs} args - Arguments to find a ReviewDecision
     * @example
     * // Get one ReviewDecision
     * const reviewDecision = await prisma.reviewDecision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewDecisionFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewDecisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReviewDecision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewDecisionFindFirstArgs} args - Arguments to find a ReviewDecision
     * @example
     * // Get one ReviewDecision
     * const reviewDecision = await prisma.reviewDecision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewDecisionFindFirstArgs>(args?: SelectSubset<T, ReviewDecisionFindFirstArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReviewDecision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewDecisionFindFirstOrThrowArgs} args - Arguments to find a ReviewDecision
     * @example
     * // Get one ReviewDecision
     * const reviewDecision = await prisma.reviewDecision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewDecisionFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewDecisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReviewDecisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewDecisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReviewDecisions
     * const reviewDecisions = await prisma.reviewDecision.findMany()
     * 
     * // Get first 10 ReviewDecisions
     * const reviewDecisions = await prisma.reviewDecision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewDecisionWithIdOnly = await prisma.reviewDecision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewDecisionFindManyArgs>(args?: SelectSubset<T, ReviewDecisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReviewDecision.
     * @param {ReviewDecisionCreateArgs} args - Arguments to create a ReviewDecision.
     * @example
     * // Create one ReviewDecision
     * const ReviewDecision = await prisma.reviewDecision.create({
     *   data: {
     *     // ... data to create a ReviewDecision
     *   }
     * })
     * 
     */
    create<T extends ReviewDecisionCreateArgs>(args: SelectSubset<T, ReviewDecisionCreateArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReviewDecisions.
     * @param {ReviewDecisionCreateManyArgs} args - Arguments to create many ReviewDecisions.
     * @example
     * // Create many ReviewDecisions
     * const reviewDecision = await prisma.reviewDecision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewDecisionCreateManyArgs>(args?: SelectSubset<T, ReviewDecisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReviewDecisions and returns the data saved in the database.
     * @param {ReviewDecisionCreateManyAndReturnArgs} args - Arguments to create many ReviewDecisions.
     * @example
     * // Create many ReviewDecisions
     * const reviewDecision = await prisma.reviewDecision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReviewDecisions and only return the `id`
     * const reviewDecisionWithIdOnly = await prisma.reviewDecision.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewDecisionCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewDecisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReviewDecision.
     * @param {ReviewDecisionDeleteArgs} args - Arguments to delete one ReviewDecision.
     * @example
     * // Delete one ReviewDecision
     * const ReviewDecision = await prisma.reviewDecision.delete({
     *   where: {
     *     // ... filter to delete one ReviewDecision
     *   }
     * })
     * 
     */
    delete<T extends ReviewDecisionDeleteArgs>(args: SelectSubset<T, ReviewDecisionDeleteArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReviewDecision.
     * @param {ReviewDecisionUpdateArgs} args - Arguments to update one ReviewDecision.
     * @example
     * // Update one ReviewDecision
     * const reviewDecision = await prisma.reviewDecision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewDecisionUpdateArgs>(args: SelectSubset<T, ReviewDecisionUpdateArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReviewDecisions.
     * @param {ReviewDecisionDeleteManyArgs} args - Arguments to filter ReviewDecisions to delete.
     * @example
     * // Delete a few ReviewDecisions
     * const { count } = await prisma.reviewDecision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDecisionDeleteManyArgs>(args?: SelectSubset<T, ReviewDecisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewDecisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewDecisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReviewDecisions
     * const reviewDecision = await prisma.reviewDecision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewDecisionUpdateManyArgs>(args: SelectSubset<T, ReviewDecisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewDecisions and returns the data updated in the database.
     * @param {ReviewDecisionUpdateManyAndReturnArgs} args - Arguments to update many ReviewDecisions.
     * @example
     * // Update many ReviewDecisions
     * const reviewDecision = await prisma.reviewDecision.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReviewDecisions and only return the `id`
     * const reviewDecisionWithIdOnly = await prisma.reviewDecision.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewDecisionUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewDecisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReviewDecision.
     * @param {ReviewDecisionUpsertArgs} args - Arguments to update or create a ReviewDecision.
     * @example
     * // Update or create a ReviewDecision
     * const reviewDecision = await prisma.reviewDecision.upsert({
     *   create: {
     *     // ... data to create a ReviewDecision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReviewDecision we want to update
     *   }
     * })
     */
    upsert<T extends ReviewDecisionUpsertArgs>(args: SelectSubset<T, ReviewDecisionUpsertArgs<ExtArgs>>): Prisma__ReviewDecisionClient<$Result.GetResult<Prisma.$ReviewDecisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReviewDecisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewDecisionCountArgs} args - Arguments to filter ReviewDecisions to count.
     * @example
     * // Count the number of ReviewDecisions
     * const count = await prisma.reviewDecision.count({
     *   where: {
     *     // ... the filter for the ReviewDecisions we want to count
     *   }
     * })
    **/
    count<T extends ReviewDecisionCountArgs>(
      args?: Subset<T, ReviewDecisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewDecisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReviewDecision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewDecisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewDecisionAggregateArgs>(args: Subset<T, ReviewDecisionAggregateArgs>): Prisma.PrismaPromise<GetReviewDecisionAggregateType<T>>

    /**
     * Group by ReviewDecision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewDecisionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewDecisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewDecisionGroupByArgs['orderBy'] }
        : { orderBy?: ReviewDecisionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewDecisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewDecisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReviewDecision model
   */
  readonly fields: ReviewDecisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReviewDecision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewDecisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReviewDecision model
   */
  interface ReviewDecisionFieldRefs {
    readonly id: FieldRef<"ReviewDecision", 'String'>
    readonly reportId: FieldRef<"ReviewDecision", 'String'>
    readonly reviewerId: FieldRef<"ReviewDecision", 'String'>
    readonly status: FieldRef<"ReviewDecision", 'ReportStatus'>
    readonly rationale: FieldRef<"ReviewDecision", 'String'>
    readonly redactions: FieldRef<"ReviewDecision", 'Json'>
    readonly createdAt: FieldRef<"ReviewDecision", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReviewDecision findUnique
   */
  export type ReviewDecisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * Filter, which ReviewDecision to fetch.
     */
    where: ReviewDecisionWhereUniqueInput
  }

  /**
   * ReviewDecision findUniqueOrThrow
   */
  export type ReviewDecisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * Filter, which ReviewDecision to fetch.
     */
    where: ReviewDecisionWhereUniqueInput
  }

  /**
   * ReviewDecision findFirst
   */
  export type ReviewDecisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * Filter, which ReviewDecision to fetch.
     */
    where?: ReviewDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewDecisions to fetch.
     */
    orderBy?: ReviewDecisionOrderByWithRelationInput | ReviewDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewDecisions.
     */
    cursor?: ReviewDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewDecisions.
     */
    distinct?: ReviewDecisionScalarFieldEnum | ReviewDecisionScalarFieldEnum[]
  }

  /**
   * ReviewDecision findFirstOrThrow
   */
  export type ReviewDecisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * Filter, which ReviewDecision to fetch.
     */
    where?: ReviewDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewDecisions to fetch.
     */
    orderBy?: ReviewDecisionOrderByWithRelationInput | ReviewDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewDecisions.
     */
    cursor?: ReviewDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewDecisions.
     */
    distinct?: ReviewDecisionScalarFieldEnum | ReviewDecisionScalarFieldEnum[]
  }

  /**
   * ReviewDecision findMany
   */
  export type ReviewDecisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * Filter, which ReviewDecisions to fetch.
     */
    where?: ReviewDecisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewDecisions to fetch.
     */
    orderBy?: ReviewDecisionOrderByWithRelationInput | ReviewDecisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReviewDecisions.
     */
    cursor?: ReviewDecisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewDecisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewDecisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewDecisions.
     */
    distinct?: ReviewDecisionScalarFieldEnum | ReviewDecisionScalarFieldEnum[]
  }

  /**
   * ReviewDecision create
   */
  export type ReviewDecisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * The data needed to create a ReviewDecision.
     */
    data: XOR<ReviewDecisionCreateInput, ReviewDecisionUncheckedCreateInput>
  }

  /**
   * ReviewDecision createMany
   */
  export type ReviewDecisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReviewDecisions.
     */
    data: ReviewDecisionCreateManyInput | ReviewDecisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReviewDecision createManyAndReturn
   */
  export type ReviewDecisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * The data used to create many ReviewDecisions.
     */
    data: ReviewDecisionCreateManyInput | ReviewDecisionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReviewDecision update
   */
  export type ReviewDecisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * The data needed to update a ReviewDecision.
     */
    data: XOR<ReviewDecisionUpdateInput, ReviewDecisionUncheckedUpdateInput>
    /**
     * Choose, which ReviewDecision to update.
     */
    where: ReviewDecisionWhereUniqueInput
  }

  /**
   * ReviewDecision updateMany
   */
  export type ReviewDecisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReviewDecisions.
     */
    data: XOR<ReviewDecisionUpdateManyMutationInput, ReviewDecisionUncheckedUpdateManyInput>
    /**
     * Filter which ReviewDecisions to update
     */
    where?: ReviewDecisionWhereInput
    /**
     * Limit how many ReviewDecisions to update.
     */
    limit?: number
  }

  /**
   * ReviewDecision updateManyAndReturn
   */
  export type ReviewDecisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * The data used to update ReviewDecisions.
     */
    data: XOR<ReviewDecisionUpdateManyMutationInput, ReviewDecisionUncheckedUpdateManyInput>
    /**
     * Filter which ReviewDecisions to update
     */
    where?: ReviewDecisionWhereInput
    /**
     * Limit how many ReviewDecisions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReviewDecision upsert
   */
  export type ReviewDecisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * The filter to search for the ReviewDecision to update in case it exists.
     */
    where: ReviewDecisionWhereUniqueInput
    /**
     * In case the ReviewDecision found by the `where` argument doesn't exist, create a new ReviewDecision with this data.
     */
    create: XOR<ReviewDecisionCreateInput, ReviewDecisionUncheckedCreateInput>
    /**
     * In case the ReviewDecision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewDecisionUpdateInput, ReviewDecisionUncheckedUpdateInput>
  }

  /**
   * ReviewDecision delete
   */
  export type ReviewDecisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
    /**
     * Filter which ReviewDecision to delete.
     */
    where: ReviewDecisionWhereUniqueInput
  }

  /**
   * ReviewDecision deleteMany
   */
  export type ReviewDecisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewDecisions to delete
     */
    where?: ReviewDecisionWhereInput
    /**
     * Limit how many ReviewDecisions to delete.
     */
    limit?: number
  }

  /**
   * ReviewDecision without action
   */
  export type ReviewDecisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewDecision
     */
    select?: ReviewDecisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReviewDecision
     */
    omit?: ReviewDecisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewDecisionInclude<ExtArgs> | null
  }


  /**
   * Model CaseNote
   */

  export type AggregateCaseNote = {
    _count: CaseNoteCountAggregateOutputType | null
    _min: CaseNoteMinAggregateOutputType | null
    _max: CaseNoteMaxAggregateOutputType | null
  }

  export type CaseNoteMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    authorId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CaseNoteMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    authorId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CaseNoteCountAggregateOutputType = {
    id: number
    reportId: number
    authorId: number
    content: number
    createdAt: number
    _all: number
  }


  export type CaseNoteMinAggregateInputType = {
    id?: true
    reportId?: true
    authorId?: true
    content?: true
    createdAt?: true
  }

  export type CaseNoteMaxAggregateInputType = {
    id?: true
    reportId?: true
    authorId?: true
    content?: true
    createdAt?: true
  }

  export type CaseNoteCountAggregateInputType = {
    id?: true
    reportId?: true
    authorId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type CaseNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseNote to aggregate.
     */
    where?: CaseNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseNotes to fetch.
     */
    orderBy?: CaseNoteOrderByWithRelationInput | CaseNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CaseNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CaseNotes
    **/
    _count?: true | CaseNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CaseNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CaseNoteMaxAggregateInputType
  }

  export type GetCaseNoteAggregateType<T extends CaseNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateCaseNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCaseNote[P]>
      : GetScalarType<T[P], AggregateCaseNote[P]>
  }




  export type CaseNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CaseNoteWhereInput
    orderBy?: CaseNoteOrderByWithAggregationInput | CaseNoteOrderByWithAggregationInput[]
    by: CaseNoteScalarFieldEnum[] | CaseNoteScalarFieldEnum
    having?: CaseNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CaseNoteCountAggregateInputType | true
    _min?: CaseNoteMinAggregateInputType
    _max?: CaseNoteMaxAggregateInputType
  }

  export type CaseNoteGroupByOutputType = {
    id: string
    reportId: string
    authorId: string
    content: string
    createdAt: Date
    _count: CaseNoteCountAggregateOutputType | null
    _min: CaseNoteMinAggregateOutputType | null
    _max: CaseNoteMaxAggregateOutputType | null
  }

  type GetCaseNoteGroupByPayload<T extends CaseNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CaseNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CaseNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CaseNoteGroupByOutputType[P]>
            : GetScalarType<T[P], CaseNoteGroupByOutputType[P]>
        }
      >
    >


  export type CaseNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    authorId?: boolean
    content?: boolean
    createdAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseNote"]>

  export type CaseNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    authorId?: boolean
    content?: boolean
    createdAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseNote"]>

  export type CaseNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    authorId?: boolean
    content?: boolean
    createdAt?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["caseNote"]>

  export type CaseNoteSelectScalar = {
    id?: boolean
    reportId?: boolean
    authorId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type CaseNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportId" | "authorId" | "content" | "createdAt", ExtArgs["result"]["caseNote"]>
  export type CaseNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CaseNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CaseNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CaseNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CaseNote"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      authorId: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["caseNote"]>
    composites: {}
  }

  type CaseNoteGetPayload<S extends boolean | null | undefined | CaseNoteDefaultArgs> = $Result.GetResult<Prisma.$CaseNotePayload, S>

  type CaseNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CaseNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CaseNoteCountAggregateInputType | true
    }

  export interface CaseNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CaseNote'], meta: { name: 'CaseNote' } }
    /**
     * Find zero or one CaseNote that matches the filter.
     * @param {CaseNoteFindUniqueArgs} args - Arguments to find a CaseNote
     * @example
     * // Get one CaseNote
     * const caseNote = await prisma.caseNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CaseNoteFindUniqueArgs>(args: SelectSubset<T, CaseNoteFindUniqueArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CaseNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CaseNoteFindUniqueOrThrowArgs} args - Arguments to find a CaseNote
     * @example
     * // Get one CaseNote
     * const caseNote = await prisma.caseNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CaseNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, CaseNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseNoteFindFirstArgs} args - Arguments to find a CaseNote
     * @example
     * // Get one CaseNote
     * const caseNote = await prisma.caseNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CaseNoteFindFirstArgs>(args?: SelectSubset<T, CaseNoteFindFirstArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CaseNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseNoteFindFirstOrThrowArgs} args - Arguments to find a CaseNote
     * @example
     * // Get one CaseNote
     * const caseNote = await prisma.caseNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CaseNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, CaseNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CaseNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CaseNotes
     * const caseNotes = await prisma.caseNote.findMany()
     * 
     * // Get first 10 CaseNotes
     * const caseNotes = await prisma.caseNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const caseNoteWithIdOnly = await prisma.caseNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CaseNoteFindManyArgs>(args?: SelectSubset<T, CaseNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CaseNote.
     * @param {CaseNoteCreateArgs} args - Arguments to create a CaseNote.
     * @example
     * // Create one CaseNote
     * const CaseNote = await prisma.caseNote.create({
     *   data: {
     *     // ... data to create a CaseNote
     *   }
     * })
     * 
     */
    create<T extends CaseNoteCreateArgs>(args: SelectSubset<T, CaseNoteCreateArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CaseNotes.
     * @param {CaseNoteCreateManyArgs} args - Arguments to create many CaseNotes.
     * @example
     * // Create many CaseNotes
     * const caseNote = await prisma.caseNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CaseNoteCreateManyArgs>(args?: SelectSubset<T, CaseNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CaseNotes and returns the data saved in the database.
     * @param {CaseNoteCreateManyAndReturnArgs} args - Arguments to create many CaseNotes.
     * @example
     * // Create many CaseNotes
     * const caseNote = await prisma.caseNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CaseNotes and only return the `id`
     * const caseNoteWithIdOnly = await prisma.caseNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CaseNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, CaseNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CaseNote.
     * @param {CaseNoteDeleteArgs} args - Arguments to delete one CaseNote.
     * @example
     * // Delete one CaseNote
     * const CaseNote = await prisma.caseNote.delete({
     *   where: {
     *     // ... filter to delete one CaseNote
     *   }
     * })
     * 
     */
    delete<T extends CaseNoteDeleteArgs>(args: SelectSubset<T, CaseNoteDeleteArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CaseNote.
     * @param {CaseNoteUpdateArgs} args - Arguments to update one CaseNote.
     * @example
     * // Update one CaseNote
     * const caseNote = await prisma.caseNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CaseNoteUpdateArgs>(args: SelectSubset<T, CaseNoteUpdateArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CaseNotes.
     * @param {CaseNoteDeleteManyArgs} args - Arguments to filter CaseNotes to delete.
     * @example
     * // Delete a few CaseNotes
     * const { count } = await prisma.caseNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CaseNoteDeleteManyArgs>(args?: SelectSubset<T, CaseNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CaseNotes
     * const caseNote = await prisma.caseNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CaseNoteUpdateManyArgs>(args: SelectSubset<T, CaseNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CaseNotes and returns the data updated in the database.
     * @param {CaseNoteUpdateManyAndReturnArgs} args - Arguments to update many CaseNotes.
     * @example
     * // Update many CaseNotes
     * const caseNote = await prisma.caseNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CaseNotes and only return the `id`
     * const caseNoteWithIdOnly = await prisma.caseNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CaseNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, CaseNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CaseNote.
     * @param {CaseNoteUpsertArgs} args - Arguments to update or create a CaseNote.
     * @example
     * // Update or create a CaseNote
     * const caseNote = await prisma.caseNote.upsert({
     *   create: {
     *     // ... data to create a CaseNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CaseNote we want to update
     *   }
     * })
     */
    upsert<T extends CaseNoteUpsertArgs>(args: SelectSubset<T, CaseNoteUpsertArgs<ExtArgs>>): Prisma__CaseNoteClient<$Result.GetResult<Prisma.$CaseNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CaseNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseNoteCountArgs} args - Arguments to filter CaseNotes to count.
     * @example
     * // Count the number of CaseNotes
     * const count = await prisma.caseNote.count({
     *   where: {
     *     // ... the filter for the CaseNotes we want to count
     *   }
     * })
    **/
    count<T extends CaseNoteCountArgs>(
      args?: Subset<T, CaseNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CaseNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CaseNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CaseNoteAggregateArgs>(args: Subset<T, CaseNoteAggregateArgs>): Prisma.PrismaPromise<GetCaseNoteAggregateType<T>>

    /**
     * Group by CaseNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CaseNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CaseNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CaseNoteGroupByArgs['orderBy'] }
        : { orderBy?: CaseNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CaseNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCaseNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CaseNote model
   */
  readonly fields: CaseNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CaseNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CaseNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CaseNote model
   */
  interface CaseNoteFieldRefs {
    readonly id: FieldRef<"CaseNote", 'String'>
    readonly reportId: FieldRef<"CaseNote", 'String'>
    readonly authorId: FieldRef<"CaseNote", 'String'>
    readonly content: FieldRef<"CaseNote", 'String'>
    readonly createdAt: FieldRef<"CaseNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CaseNote findUnique
   */
  export type CaseNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * Filter, which CaseNote to fetch.
     */
    where: CaseNoteWhereUniqueInput
  }

  /**
   * CaseNote findUniqueOrThrow
   */
  export type CaseNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * Filter, which CaseNote to fetch.
     */
    where: CaseNoteWhereUniqueInput
  }

  /**
   * CaseNote findFirst
   */
  export type CaseNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * Filter, which CaseNote to fetch.
     */
    where?: CaseNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseNotes to fetch.
     */
    orderBy?: CaseNoteOrderByWithRelationInput | CaseNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseNotes.
     */
    cursor?: CaseNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseNotes.
     */
    distinct?: CaseNoteScalarFieldEnum | CaseNoteScalarFieldEnum[]
  }

  /**
   * CaseNote findFirstOrThrow
   */
  export type CaseNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * Filter, which CaseNote to fetch.
     */
    where?: CaseNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseNotes to fetch.
     */
    orderBy?: CaseNoteOrderByWithRelationInput | CaseNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CaseNotes.
     */
    cursor?: CaseNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseNotes.
     */
    distinct?: CaseNoteScalarFieldEnum | CaseNoteScalarFieldEnum[]
  }

  /**
   * CaseNote findMany
   */
  export type CaseNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * Filter, which CaseNotes to fetch.
     */
    where?: CaseNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CaseNotes to fetch.
     */
    orderBy?: CaseNoteOrderByWithRelationInput | CaseNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CaseNotes.
     */
    cursor?: CaseNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CaseNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CaseNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CaseNotes.
     */
    distinct?: CaseNoteScalarFieldEnum | CaseNoteScalarFieldEnum[]
  }

  /**
   * CaseNote create
   */
  export type CaseNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a CaseNote.
     */
    data: XOR<CaseNoteCreateInput, CaseNoteUncheckedCreateInput>
  }

  /**
   * CaseNote createMany
   */
  export type CaseNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CaseNotes.
     */
    data: CaseNoteCreateManyInput | CaseNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CaseNote createManyAndReturn
   */
  export type CaseNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * The data used to create many CaseNotes.
     */
    data: CaseNoteCreateManyInput | CaseNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseNote update
   */
  export type CaseNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a CaseNote.
     */
    data: XOR<CaseNoteUpdateInput, CaseNoteUncheckedUpdateInput>
    /**
     * Choose, which CaseNote to update.
     */
    where: CaseNoteWhereUniqueInput
  }

  /**
   * CaseNote updateMany
   */
  export type CaseNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CaseNotes.
     */
    data: XOR<CaseNoteUpdateManyMutationInput, CaseNoteUncheckedUpdateManyInput>
    /**
     * Filter which CaseNotes to update
     */
    where?: CaseNoteWhereInput
    /**
     * Limit how many CaseNotes to update.
     */
    limit?: number
  }

  /**
   * CaseNote updateManyAndReturn
   */
  export type CaseNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * The data used to update CaseNotes.
     */
    data: XOR<CaseNoteUpdateManyMutationInput, CaseNoteUncheckedUpdateManyInput>
    /**
     * Filter which CaseNotes to update
     */
    where?: CaseNoteWhereInput
    /**
     * Limit how many CaseNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CaseNote upsert
   */
  export type CaseNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the CaseNote to update in case it exists.
     */
    where: CaseNoteWhereUniqueInput
    /**
     * In case the CaseNote found by the `where` argument doesn't exist, create a new CaseNote with this data.
     */
    create: XOR<CaseNoteCreateInput, CaseNoteUncheckedCreateInput>
    /**
     * In case the CaseNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CaseNoteUpdateInput, CaseNoteUncheckedUpdateInput>
  }

  /**
   * CaseNote delete
   */
  export type CaseNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
    /**
     * Filter which CaseNote to delete.
     */
    where: CaseNoteWhereUniqueInput
  }

  /**
   * CaseNote deleteMany
   */
  export type CaseNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CaseNotes to delete
     */
    where?: CaseNoteWhereInput
    /**
     * Limit how many CaseNotes to delete.
     */
    limit?: number
  }

  /**
   * CaseNote without action
   */
  export type CaseNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CaseNote
     */
    select?: CaseNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CaseNote
     */
    omit?: CaseNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CaseNoteInclude<ExtArgs> | null
  }


  /**
   * Model AuditEvent
   */

  export type AggregateAuditEvent = {
    _count: AuditEventCountAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  export type AuditEventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    reportId: string | null
    action: $Enums.AuditAction | null
    createdAt: Date | null
  }

  export type AuditEventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    reportId: string | null
    action: $Enums.AuditAction | null
    createdAt: Date | null
  }

  export type AuditEventCountAggregateOutputType = {
    id: number
    userId: number
    reportId: number
    action: number
    detail: number
    createdAt: number
    _all: number
  }


  export type AuditEventMinAggregateInputType = {
    id?: true
    userId?: true
    reportId?: true
    action?: true
    createdAt?: true
  }

  export type AuditEventMaxAggregateInputType = {
    id?: true
    userId?: true
    reportId?: true
    action?: true
    createdAt?: true
  }

  export type AuditEventCountAggregateInputType = {
    id?: true
    userId?: true
    reportId?: true
    action?: true
    detail?: true
    createdAt?: true
    _all?: true
  }

  export type AuditEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvent to aggregate.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditEvents
    **/
    _count?: true | AuditEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditEventMaxAggregateInputType
  }

  export type GetAuditEventAggregateType<T extends AuditEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditEvent[P]>
      : GetScalarType<T[P], AggregateAuditEvent[P]>
  }




  export type AuditEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEventWhereInput
    orderBy?: AuditEventOrderByWithAggregationInput | AuditEventOrderByWithAggregationInput[]
    by: AuditEventScalarFieldEnum[] | AuditEventScalarFieldEnum
    having?: AuditEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditEventCountAggregateInputType | true
    _min?: AuditEventMinAggregateInputType
    _max?: AuditEventMaxAggregateInputType
  }

  export type AuditEventGroupByOutputType = {
    id: string
    userId: string | null
    reportId: string | null
    action: $Enums.AuditAction
    detail: JsonValue | null
    createdAt: Date
    _count: AuditEventCountAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  type GetAuditEventGroupByPayload<T extends AuditEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
            : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
        }
      >
    >


  export type AuditEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reportId?: boolean
    action?: boolean
    detail?: boolean
    createdAt?: boolean
    user?: boolean | AuditEvent$userArgs<ExtArgs>
    report?: boolean | AuditEvent$reportArgs<ExtArgs>
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reportId?: boolean
    action?: boolean
    detail?: boolean
    createdAt?: boolean
    user?: boolean | AuditEvent$userArgs<ExtArgs>
    report?: boolean | AuditEvent$reportArgs<ExtArgs>
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reportId?: boolean
    action?: boolean
    detail?: boolean
    createdAt?: boolean
    user?: boolean | AuditEvent$userArgs<ExtArgs>
    report?: boolean | AuditEvent$reportArgs<ExtArgs>
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectScalar = {
    id?: boolean
    userId?: boolean
    reportId?: boolean
    action?: boolean
    detail?: boolean
    createdAt?: boolean
  }

  export type AuditEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "reportId" | "action" | "detail" | "createdAt", ExtArgs["result"]["auditEvent"]>
  export type AuditEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditEvent$userArgs<ExtArgs>
    report?: boolean | AuditEvent$reportArgs<ExtArgs>
  }
  export type AuditEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditEvent$userArgs<ExtArgs>
    report?: boolean | AuditEvent$reportArgs<ExtArgs>
  }
  export type AuditEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditEvent$userArgs<ExtArgs>
    report?: boolean | AuditEvent$reportArgs<ExtArgs>
  }

  export type $AuditEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditEvent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      report: Prisma.$ReportPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      reportId: string | null
      action: $Enums.AuditAction
      detail: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditEvent"]>
    composites: {}
  }

  type AuditEventGetPayload<S extends boolean | null | undefined | AuditEventDefaultArgs> = $Result.GetResult<Prisma.$AuditEventPayload, S>

  type AuditEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditEventCountAggregateInputType | true
    }

  export interface AuditEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditEvent'], meta: { name: 'AuditEvent' } }
    /**
     * Find zero or one AuditEvent that matches the filter.
     * @param {AuditEventFindUniqueArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditEventFindUniqueArgs>(args: SelectSubset<T, AuditEventFindUniqueArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditEventFindUniqueOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditEventFindFirstArgs>(args?: SelectSubset<T, AuditEventFindFirstArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany()
     * 
     * // Get first 10 AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditEventFindManyArgs>(args?: SelectSubset<T, AuditEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditEvent.
     * @param {AuditEventCreateArgs} args - Arguments to create a AuditEvent.
     * @example
     * // Create one AuditEvent
     * const AuditEvent = await prisma.auditEvent.create({
     *   data: {
     *     // ... data to create a AuditEvent
     *   }
     * })
     * 
     */
    create<T extends AuditEventCreateArgs>(args: SelectSubset<T, AuditEventCreateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditEvents.
     * @param {AuditEventCreateManyArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditEventCreateManyArgs>(args?: SelectSubset<T, AuditEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditEvents and returns the data saved in the database.
     * @param {AuditEventCreateManyAndReturnArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditEvents and only return the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditEvent.
     * @param {AuditEventDeleteArgs} args - Arguments to delete one AuditEvent.
     * @example
     * // Delete one AuditEvent
     * const AuditEvent = await prisma.auditEvent.delete({
     *   where: {
     *     // ... filter to delete one AuditEvent
     *   }
     * })
     * 
     */
    delete<T extends AuditEventDeleteArgs>(args: SelectSubset<T, AuditEventDeleteArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditEvent.
     * @param {AuditEventUpdateArgs} args - Arguments to update one AuditEvent.
     * @example
     * // Update one AuditEvent
     * const auditEvent = await prisma.auditEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditEventUpdateArgs>(args: SelectSubset<T, AuditEventUpdateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditEvents.
     * @param {AuditEventDeleteManyArgs} args - Arguments to filter AuditEvents to delete.
     * @example
     * // Delete a few AuditEvents
     * const { count } = await prisma.auditEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditEventDeleteManyArgs>(args?: SelectSubset<T, AuditEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditEvents
     * const auditEvent = await prisma.auditEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditEventUpdateManyArgs>(args: SelectSubset<T, AuditEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEvents and returns the data updated in the database.
     * @param {AuditEventUpdateManyAndReturnArgs} args - Arguments to update many AuditEvents.
     * @example
     * // Update many AuditEvents
     * const auditEvent = await prisma.auditEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditEvents and only return the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditEvent.
     * @param {AuditEventUpsertArgs} args - Arguments to update or create a AuditEvent.
     * @example
     * // Update or create a AuditEvent
     * const auditEvent = await prisma.auditEvent.upsert({
     *   create: {
     *     // ... data to create a AuditEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditEvent we want to update
     *   }
     * })
     */
    upsert<T extends AuditEventUpsertArgs>(args: SelectSubset<T, AuditEventUpsertArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventCountArgs} args - Arguments to filter AuditEvents to count.
     * @example
     * // Count the number of AuditEvents
     * const count = await prisma.auditEvent.count({
     *   where: {
     *     // ... the filter for the AuditEvents we want to count
     *   }
     * })
    **/
    count<T extends AuditEventCountArgs>(
      args?: Subset<T, AuditEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditEventAggregateArgs>(args: Subset<T, AuditEventAggregateArgs>): Prisma.PrismaPromise<GetAuditEventAggregateType<T>>

    /**
     * Group by AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditEventGroupByArgs['orderBy'] }
        : { orderBy?: AuditEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditEvent model
   */
  readonly fields: AuditEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditEvent$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditEvent$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    report<T extends AuditEvent$reportArgs<ExtArgs> = {}>(args?: Subset<T, AuditEvent$reportArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditEvent model
   */
  interface AuditEventFieldRefs {
    readonly id: FieldRef<"AuditEvent", 'String'>
    readonly userId: FieldRef<"AuditEvent", 'String'>
    readonly reportId: FieldRef<"AuditEvent", 'String'>
    readonly action: FieldRef<"AuditEvent", 'AuditAction'>
    readonly detail: FieldRef<"AuditEvent", 'Json'>
    readonly createdAt: FieldRef<"AuditEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditEvent findUnique
   */
  export type AuditEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findUniqueOrThrow
   */
  export type AuditEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findFirst
   */
  export type AuditEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findFirstOrThrow
   */
  export type AuditEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findMany
   */
  export type AuditEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvents to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent create
   */
  export type AuditEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditEvent.
     */
    data: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
  }

  /**
   * AuditEvent createMany
   */
  export type AuditEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEvent createManyAndReturn
   */
  export type AuditEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditEvent update
   */
  export type AuditEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditEvent.
     */
    data: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
    /**
     * Choose, which AuditEvent to update.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent updateMany
   */
  export type AuditEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditEvents.
     */
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyInput>
    /**
     * Filter which AuditEvents to update
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to update.
     */
    limit?: number
  }

  /**
   * AuditEvent updateManyAndReturn
   */
  export type AuditEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data used to update AuditEvents.
     */
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyInput>
    /**
     * Filter which AuditEvents to update
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditEvent upsert
   */
  export type AuditEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditEvent to update in case it exists.
     */
    where: AuditEventWhereUniqueInput
    /**
     * In case the AuditEvent found by the `where` argument doesn't exist, create a new AuditEvent with this data.
     */
    create: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
    /**
     * In case the AuditEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
  }

  /**
   * AuditEvent delete
   */
  export type AuditEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter which AuditEvent to delete.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent deleteMany
   */
  export type AuditEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvents to delete
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to delete.
     */
    limit?: number
  }

  /**
   * AuditEvent.user
   */
  export type AuditEvent$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditEvent.report
   */
  export type AuditEvent$reportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
  }

  /**
   * AuditEvent without action
   */
  export type AuditEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
  }


  /**
   * Model TrendSnapshot
   */

  export type AggregateTrendSnapshot = {
    _count: TrendSnapshotCountAggregateOutputType | null
    _avg: TrendSnapshotAvgAggregateOutputType | null
    _sum: TrendSnapshotSumAggregateOutputType | null
    _min: TrendSnapshotMinAggregateOutputType | null
    _max: TrendSnapshotMaxAggregateOutputType | null
  }

  export type TrendSnapshotAvgAggregateOutputType = {
    reportCount: number | null
  }

  export type TrendSnapshotSumAggregateOutputType = {
    reportCount: number | null
  }

  export type TrendSnapshotMinAggregateOutputType = {
    id: string | null
    date: Date | null
    contentType: string | null
    riskLevel: $Enums.RiskLevel | null
    tactic: string | null
    reportCount: number | null
    sampleReport: string | null
    reportId: string | null
    createdAt: Date | null
  }

  export type TrendSnapshotMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    contentType: string | null
    riskLevel: $Enums.RiskLevel | null
    tactic: string | null
    reportCount: number | null
    sampleReport: string | null
    reportId: string | null
    createdAt: Date | null
  }

  export type TrendSnapshotCountAggregateOutputType = {
    id: number
    date: number
    contentType: number
    riskLevel: number
    tactic: number
    reportCount: number
    sampleReport: number
    reportId: number
    createdAt: number
    _all: number
  }


  export type TrendSnapshotAvgAggregateInputType = {
    reportCount?: true
  }

  export type TrendSnapshotSumAggregateInputType = {
    reportCount?: true
  }

  export type TrendSnapshotMinAggregateInputType = {
    id?: true
    date?: true
    contentType?: true
    riskLevel?: true
    tactic?: true
    reportCount?: true
    sampleReport?: true
    reportId?: true
    createdAt?: true
  }

  export type TrendSnapshotMaxAggregateInputType = {
    id?: true
    date?: true
    contentType?: true
    riskLevel?: true
    tactic?: true
    reportCount?: true
    sampleReport?: true
    reportId?: true
    createdAt?: true
  }

  export type TrendSnapshotCountAggregateInputType = {
    id?: true
    date?: true
    contentType?: true
    riskLevel?: true
    tactic?: true
    reportCount?: true
    sampleReport?: true
    reportId?: true
    createdAt?: true
    _all?: true
  }

  export type TrendSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrendSnapshot to aggregate.
     */
    where?: TrendSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrendSnapshots to fetch.
     */
    orderBy?: TrendSnapshotOrderByWithRelationInput | TrendSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrendSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrendSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrendSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrendSnapshots
    **/
    _count?: true | TrendSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrendSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrendSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrendSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrendSnapshotMaxAggregateInputType
  }

  export type GetTrendSnapshotAggregateType<T extends TrendSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateTrendSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrendSnapshot[P]>
      : GetScalarType<T[P], AggregateTrendSnapshot[P]>
  }




  export type TrendSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrendSnapshotWhereInput
    orderBy?: TrendSnapshotOrderByWithAggregationInput | TrendSnapshotOrderByWithAggregationInput[]
    by: TrendSnapshotScalarFieldEnum[] | TrendSnapshotScalarFieldEnum
    having?: TrendSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrendSnapshotCountAggregateInputType | true
    _avg?: TrendSnapshotAvgAggregateInputType
    _sum?: TrendSnapshotSumAggregateInputType
    _min?: TrendSnapshotMinAggregateInputType
    _max?: TrendSnapshotMaxAggregateInputType
  }

  export type TrendSnapshotGroupByOutputType = {
    id: string
    date: Date
    contentType: string | null
    riskLevel: $Enums.RiskLevel | null
    tactic: string | null
    reportCount: number
    sampleReport: string | null
    reportId: string | null
    createdAt: Date
    _count: TrendSnapshotCountAggregateOutputType | null
    _avg: TrendSnapshotAvgAggregateOutputType | null
    _sum: TrendSnapshotSumAggregateOutputType | null
    _min: TrendSnapshotMinAggregateOutputType | null
    _max: TrendSnapshotMaxAggregateOutputType | null
  }

  type GetTrendSnapshotGroupByPayload<T extends TrendSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrendSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrendSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrendSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], TrendSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type TrendSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    contentType?: boolean
    riskLevel?: boolean
    tactic?: boolean
    reportCount?: boolean
    sampleReport?: boolean
    reportId?: boolean
    createdAt?: boolean
    report?: boolean | TrendSnapshot$reportArgs<ExtArgs>
  }, ExtArgs["result"]["trendSnapshot"]>

  export type TrendSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    contentType?: boolean
    riskLevel?: boolean
    tactic?: boolean
    reportCount?: boolean
    sampleReport?: boolean
    reportId?: boolean
    createdAt?: boolean
    report?: boolean | TrendSnapshot$reportArgs<ExtArgs>
  }, ExtArgs["result"]["trendSnapshot"]>

  export type TrendSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    contentType?: boolean
    riskLevel?: boolean
    tactic?: boolean
    reportCount?: boolean
    sampleReport?: boolean
    reportId?: boolean
    createdAt?: boolean
    report?: boolean | TrendSnapshot$reportArgs<ExtArgs>
  }, ExtArgs["result"]["trendSnapshot"]>

  export type TrendSnapshotSelectScalar = {
    id?: boolean
    date?: boolean
    contentType?: boolean
    riskLevel?: boolean
    tactic?: boolean
    reportCount?: boolean
    sampleReport?: boolean
    reportId?: boolean
    createdAt?: boolean
  }

  export type TrendSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "contentType" | "riskLevel" | "tactic" | "reportCount" | "sampleReport" | "reportId" | "createdAt", ExtArgs["result"]["trendSnapshot"]>
  export type TrendSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | TrendSnapshot$reportArgs<ExtArgs>
  }
  export type TrendSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | TrendSnapshot$reportArgs<ExtArgs>
  }
  export type TrendSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | TrendSnapshot$reportArgs<ExtArgs>
  }

  export type $TrendSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrendSnapshot"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      contentType: string | null
      riskLevel: $Enums.RiskLevel | null
      tactic: string | null
      reportCount: number
      sampleReport: string | null
      reportId: string | null
      createdAt: Date
    }, ExtArgs["result"]["trendSnapshot"]>
    composites: {}
  }

  type TrendSnapshotGetPayload<S extends boolean | null | undefined | TrendSnapshotDefaultArgs> = $Result.GetResult<Prisma.$TrendSnapshotPayload, S>

  type TrendSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrendSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrendSnapshotCountAggregateInputType | true
    }

  export interface TrendSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrendSnapshot'], meta: { name: 'TrendSnapshot' } }
    /**
     * Find zero or one TrendSnapshot that matches the filter.
     * @param {TrendSnapshotFindUniqueArgs} args - Arguments to find a TrendSnapshot
     * @example
     * // Get one TrendSnapshot
     * const trendSnapshot = await prisma.trendSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrendSnapshotFindUniqueArgs>(args: SelectSubset<T, TrendSnapshotFindUniqueArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrendSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrendSnapshotFindUniqueOrThrowArgs} args - Arguments to find a TrendSnapshot
     * @example
     * // Get one TrendSnapshot
     * const trendSnapshot = await prisma.trendSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrendSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, TrendSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrendSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrendSnapshotFindFirstArgs} args - Arguments to find a TrendSnapshot
     * @example
     * // Get one TrendSnapshot
     * const trendSnapshot = await prisma.trendSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrendSnapshotFindFirstArgs>(args?: SelectSubset<T, TrendSnapshotFindFirstArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrendSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrendSnapshotFindFirstOrThrowArgs} args - Arguments to find a TrendSnapshot
     * @example
     * // Get one TrendSnapshot
     * const trendSnapshot = await prisma.trendSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrendSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, TrendSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrendSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrendSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrendSnapshots
     * const trendSnapshots = await prisma.trendSnapshot.findMany()
     * 
     * // Get first 10 TrendSnapshots
     * const trendSnapshots = await prisma.trendSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trendSnapshotWithIdOnly = await prisma.trendSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrendSnapshotFindManyArgs>(args?: SelectSubset<T, TrendSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrendSnapshot.
     * @param {TrendSnapshotCreateArgs} args - Arguments to create a TrendSnapshot.
     * @example
     * // Create one TrendSnapshot
     * const TrendSnapshot = await prisma.trendSnapshot.create({
     *   data: {
     *     // ... data to create a TrendSnapshot
     *   }
     * })
     * 
     */
    create<T extends TrendSnapshotCreateArgs>(args: SelectSubset<T, TrendSnapshotCreateArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrendSnapshots.
     * @param {TrendSnapshotCreateManyArgs} args - Arguments to create many TrendSnapshots.
     * @example
     * // Create many TrendSnapshots
     * const trendSnapshot = await prisma.trendSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrendSnapshotCreateManyArgs>(args?: SelectSubset<T, TrendSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrendSnapshots and returns the data saved in the database.
     * @param {TrendSnapshotCreateManyAndReturnArgs} args - Arguments to create many TrendSnapshots.
     * @example
     * // Create many TrendSnapshots
     * const trendSnapshot = await prisma.trendSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrendSnapshots and only return the `id`
     * const trendSnapshotWithIdOnly = await prisma.trendSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrendSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, TrendSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrendSnapshot.
     * @param {TrendSnapshotDeleteArgs} args - Arguments to delete one TrendSnapshot.
     * @example
     * // Delete one TrendSnapshot
     * const TrendSnapshot = await prisma.trendSnapshot.delete({
     *   where: {
     *     // ... filter to delete one TrendSnapshot
     *   }
     * })
     * 
     */
    delete<T extends TrendSnapshotDeleteArgs>(args: SelectSubset<T, TrendSnapshotDeleteArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrendSnapshot.
     * @param {TrendSnapshotUpdateArgs} args - Arguments to update one TrendSnapshot.
     * @example
     * // Update one TrendSnapshot
     * const trendSnapshot = await prisma.trendSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrendSnapshotUpdateArgs>(args: SelectSubset<T, TrendSnapshotUpdateArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrendSnapshots.
     * @param {TrendSnapshotDeleteManyArgs} args - Arguments to filter TrendSnapshots to delete.
     * @example
     * // Delete a few TrendSnapshots
     * const { count } = await prisma.trendSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrendSnapshotDeleteManyArgs>(args?: SelectSubset<T, TrendSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrendSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrendSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrendSnapshots
     * const trendSnapshot = await prisma.trendSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrendSnapshotUpdateManyArgs>(args: SelectSubset<T, TrendSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrendSnapshots and returns the data updated in the database.
     * @param {TrendSnapshotUpdateManyAndReturnArgs} args - Arguments to update many TrendSnapshots.
     * @example
     * // Update many TrendSnapshots
     * const trendSnapshot = await prisma.trendSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrendSnapshots and only return the `id`
     * const trendSnapshotWithIdOnly = await prisma.trendSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrendSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, TrendSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrendSnapshot.
     * @param {TrendSnapshotUpsertArgs} args - Arguments to update or create a TrendSnapshot.
     * @example
     * // Update or create a TrendSnapshot
     * const trendSnapshot = await prisma.trendSnapshot.upsert({
     *   create: {
     *     // ... data to create a TrendSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrendSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends TrendSnapshotUpsertArgs>(args: SelectSubset<T, TrendSnapshotUpsertArgs<ExtArgs>>): Prisma__TrendSnapshotClient<$Result.GetResult<Prisma.$TrendSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrendSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrendSnapshotCountArgs} args - Arguments to filter TrendSnapshots to count.
     * @example
     * // Count the number of TrendSnapshots
     * const count = await prisma.trendSnapshot.count({
     *   where: {
     *     // ... the filter for the TrendSnapshots we want to count
     *   }
     * })
    **/
    count<T extends TrendSnapshotCountArgs>(
      args?: Subset<T, TrendSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrendSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrendSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrendSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrendSnapshotAggregateArgs>(args: Subset<T, TrendSnapshotAggregateArgs>): Prisma.PrismaPromise<GetTrendSnapshotAggregateType<T>>

    /**
     * Group by TrendSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrendSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrendSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrendSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: TrendSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrendSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrendSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrendSnapshot model
   */
  readonly fields: TrendSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrendSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrendSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends TrendSnapshot$reportArgs<ExtArgs> = {}>(args?: Subset<T, TrendSnapshot$reportArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrendSnapshot model
   */
  interface TrendSnapshotFieldRefs {
    readonly id: FieldRef<"TrendSnapshot", 'String'>
    readonly date: FieldRef<"TrendSnapshot", 'DateTime'>
    readonly contentType: FieldRef<"TrendSnapshot", 'String'>
    readonly riskLevel: FieldRef<"TrendSnapshot", 'RiskLevel'>
    readonly tactic: FieldRef<"TrendSnapshot", 'String'>
    readonly reportCount: FieldRef<"TrendSnapshot", 'Int'>
    readonly sampleReport: FieldRef<"TrendSnapshot", 'String'>
    readonly reportId: FieldRef<"TrendSnapshot", 'String'>
    readonly createdAt: FieldRef<"TrendSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrendSnapshot findUnique
   */
  export type TrendSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrendSnapshot to fetch.
     */
    where: TrendSnapshotWhereUniqueInput
  }

  /**
   * TrendSnapshot findUniqueOrThrow
   */
  export type TrendSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrendSnapshot to fetch.
     */
    where: TrendSnapshotWhereUniqueInput
  }

  /**
   * TrendSnapshot findFirst
   */
  export type TrendSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrendSnapshot to fetch.
     */
    where?: TrendSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrendSnapshots to fetch.
     */
    orderBy?: TrendSnapshotOrderByWithRelationInput | TrendSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrendSnapshots.
     */
    cursor?: TrendSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrendSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrendSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrendSnapshots.
     */
    distinct?: TrendSnapshotScalarFieldEnum | TrendSnapshotScalarFieldEnum[]
  }

  /**
   * TrendSnapshot findFirstOrThrow
   */
  export type TrendSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrendSnapshot to fetch.
     */
    where?: TrendSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrendSnapshots to fetch.
     */
    orderBy?: TrendSnapshotOrderByWithRelationInput | TrendSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrendSnapshots.
     */
    cursor?: TrendSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrendSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrendSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrendSnapshots.
     */
    distinct?: TrendSnapshotScalarFieldEnum | TrendSnapshotScalarFieldEnum[]
  }

  /**
   * TrendSnapshot findMany
   */
  export type TrendSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrendSnapshots to fetch.
     */
    where?: TrendSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrendSnapshots to fetch.
     */
    orderBy?: TrendSnapshotOrderByWithRelationInput | TrendSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrendSnapshots.
     */
    cursor?: TrendSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrendSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrendSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrendSnapshots.
     */
    distinct?: TrendSnapshotScalarFieldEnum | TrendSnapshotScalarFieldEnum[]
  }

  /**
   * TrendSnapshot create
   */
  export type TrendSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a TrendSnapshot.
     */
    data: XOR<TrendSnapshotCreateInput, TrendSnapshotUncheckedCreateInput>
  }

  /**
   * TrendSnapshot createMany
   */
  export type TrendSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrendSnapshots.
     */
    data: TrendSnapshotCreateManyInput | TrendSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrendSnapshot createManyAndReturn
   */
  export type TrendSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many TrendSnapshots.
     */
    data: TrendSnapshotCreateManyInput | TrendSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrendSnapshot update
   */
  export type TrendSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a TrendSnapshot.
     */
    data: XOR<TrendSnapshotUpdateInput, TrendSnapshotUncheckedUpdateInput>
    /**
     * Choose, which TrendSnapshot to update.
     */
    where: TrendSnapshotWhereUniqueInput
  }

  /**
   * TrendSnapshot updateMany
   */
  export type TrendSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrendSnapshots.
     */
    data: XOR<TrendSnapshotUpdateManyMutationInput, TrendSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TrendSnapshots to update
     */
    where?: TrendSnapshotWhereInput
    /**
     * Limit how many TrendSnapshots to update.
     */
    limit?: number
  }

  /**
   * TrendSnapshot updateManyAndReturn
   */
  export type TrendSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update TrendSnapshots.
     */
    data: XOR<TrendSnapshotUpdateManyMutationInput, TrendSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TrendSnapshots to update
     */
    where?: TrendSnapshotWhereInput
    /**
     * Limit how many TrendSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrendSnapshot upsert
   */
  export type TrendSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the TrendSnapshot to update in case it exists.
     */
    where: TrendSnapshotWhereUniqueInput
    /**
     * In case the TrendSnapshot found by the `where` argument doesn't exist, create a new TrendSnapshot with this data.
     */
    create: XOR<TrendSnapshotCreateInput, TrendSnapshotUncheckedCreateInput>
    /**
     * In case the TrendSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrendSnapshotUpdateInput, TrendSnapshotUncheckedUpdateInput>
  }

  /**
   * TrendSnapshot delete
   */
  export type TrendSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
    /**
     * Filter which TrendSnapshot to delete.
     */
    where: TrendSnapshotWhereUniqueInput
  }

  /**
   * TrendSnapshot deleteMany
   */
  export type TrendSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrendSnapshots to delete
     */
    where?: TrendSnapshotWhereInput
    /**
     * Limit how many TrendSnapshots to delete.
     */
    limit?: number
  }

  /**
   * TrendSnapshot.report
   */
  export type TrendSnapshot$reportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
  }

  /**
   * TrendSnapshot without action
   */
  export type TrendSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrendSnapshot
     */
    select?: TrendSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrendSnapshot
     */
    omit?: TrendSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrendSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    avatarUrl: 'avatarUrl',
    googleId: 'googleId',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    submittedById: 'submittedById',
    contentType: 'contentType',
    rawContent: 'rawContent',
    publicSummary: 'publicSummary',
    platform: 'platform',
    targetRegion: 'targetRegion',
    riskLevel: 'riskLevel',
    riskScore: 'riskScore',
    evidenceJson: 'evidenceJson',
    storyModeJson: 'storyModeJson',
    nextStepsJson: 'nextStepsJson',
    caveat: 'caveat',
    status: 'status',
    sourceType: 'sourceType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const IndicatorScalarFieldEnum: {
    id: 'id',
    type: 'type',
    value: 'value',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type IndicatorScalarFieldEnum = (typeof IndicatorScalarFieldEnum)[keyof typeof IndicatorScalarFieldEnum]


  export const ReportIndicatorScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    indicatorId: 'indicatorId',
    context: 'context'
  };

  export type ReportIndicatorScalarFieldEnum = (typeof ReportIndicatorScalarFieldEnum)[keyof typeof ReportIndicatorScalarFieldEnum]


  export const MatchEvidenceScalarFieldEnum: {
    id: 'id',
    reportAId: 'reportAId',
    reportBId: 'reportBId',
    similarityScore: 'similarityScore',
    matchedClues: 'matchedClues',
    differences: 'differences',
    createdAt: 'createdAt'
  };

  export type MatchEvidenceScalarFieldEnum = (typeof MatchEvidenceScalarFieldEnum)[keyof typeof MatchEvidenceScalarFieldEnum]


  export const ReviewDecisionScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    reviewerId: 'reviewerId',
    status: 'status',
    rationale: 'rationale',
    redactions: 'redactions',
    createdAt: 'createdAt'
  };

  export type ReviewDecisionScalarFieldEnum = (typeof ReviewDecisionScalarFieldEnum)[keyof typeof ReviewDecisionScalarFieldEnum]


  export const CaseNoteScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    authorId: 'authorId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type CaseNoteScalarFieldEnum = (typeof CaseNoteScalarFieldEnum)[keyof typeof CaseNoteScalarFieldEnum]


  export const AuditEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    reportId: 'reportId',
    action: 'action',
    detail: 'detail',
    createdAt: 'createdAt'
  };

  export type AuditEventScalarFieldEnum = (typeof AuditEventScalarFieldEnum)[keyof typeof AuditEventScalarFieldEnum]


  export const TrendSnapshotScalarFieldEnum: {
    id: 'id',
    date: 'date',
    contentType: 'contentType',
    riskLevel: 'riskLevel',
    tactic: 'tactic',
    reportCount: 'reportCount',
    sampleReport: 'sampleReport',
    reportId: 'reportId',
    createdAt: 'createdAt'
  };

  export type TrendSnapshotScalarFieldEnum = (typeof TrendSnapshotScalarFieldEnum)[keyof typeof TrendSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'RiskLevel'
   */
  export type EnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel'>
    


  /**
   * Reference to a field of type 'RiskLevel[]'
   */
  export type ListEnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    


  /**
   * Reference to a field of type 'ReportStatus[]'
   */
  export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>
    


  /**
   * Reference to a field of type 'SourceType'
   */
  export type EnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType'>
    


  /**
   * Reference to a field of type 'SourceType[]'
   */
  export type ListEnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType[]'>
    


  /**
   * Reference to a field of type 'IndicatorType'
   */
  export type EnumIndicatorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IndicatorType'>
    


  /**
   * Reference to a field of type 'IndicatorType[]'
   */
  export type ListEnumIndicatorTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IndicatorType[]'>
    


  /**
   * Reference to a field of type 'AuditAction'
   */
  export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>
    


  /**
   * Reference to a field of type 'AuditAction[]'
   */
  export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reports?: ReportListRelationFilter
    reviewDecisions?: ReviewDecisionListRelationFilter
    caseNotes?: CaseNoteListRelationFilter
    auditEvents?: AuditEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reports?: ReportOrderByRelationAggregateInput
    reviewDecisions?: ReviewDecisionOrderByRelationAggregateInput
    caseNotes?: CaseNoteOrderByRelationAggregateInput
    auditEvents?: AuditEventOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    reports?: ReportListRelationFilter
    reviewDecisions?: ReviewDecisionListRelationFilter
    caseNotes?: CaseNoteListRelationFilter
    auditEvents?: AuditEventListRelationFilter
  }, "id" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    submittedById?: StringNullableFilter<"Report"> | string | null
    contentType?: StringFilter<"Report"> | string
    rawContent?: StringFilter<"Report"> | string
    publicSummary?: StringNullableFilter<"Report"> | string | null
    platform?: StringNullableFilter<"Report"> | string | null
    targetRegion?: StringNullableFilter<"Report"> | string | null
    riskLevel?: EnumRiskLevelFilter<"Report"> | $Enums.RiskLevel
    riskScore?: FloatFilter<"Report"> | number
    evidenceJson?: JsonNullableFilter<"Report">
    storyModeJson?: JsonNullableFilter<"Report">
    nextStepsJson?: JsonNullableFilter<"Report">
    caveat?: StringNullableFilter<"Report"> | string | null
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFilter<"Report"> | $Enums.SourceType
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    submittedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    indicators?: ReportIndicatorListRelationFilter
    reviewDecisions?: ReviewDecisionListRelationFilter
    caseNotes?: CaseNoteListRelationFilter
    auditEvents?: AuditEventListRelationFilter
    matchesAsA?: MatchEvidenceListRelationFilter
    matchesAsB?: MatchEvidenceListRelationFilter
    trendSnapshots?: TrendSnapshotListRelationFilter
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    submittedById?: SortOrderInput | SortOrder
    contentType?: SortOrder
    rawContent?: SortOrder
    publicSummary?: SortOrderInput | SortOrder
    platform?: SortOrderInput | SortOrder
    targetRegion?: SortOrderInput | SortOrder
    riskLevel?: SortOrder
    riskScore?: SortOrder
    evidenceJson?: SortOrderInput | SortOrder
    storyModeJson?: SortOrderInput | SortOrder
    nextStepsJson?: SortOrderInput | SortOrder
    caveat?: SortOrderInput | SortOrder
    status?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedBy?: UserOrderByWithRelationInput
    indicators?: ReportIndicatorOrderByRelationAggregateInput
    reviewDecisions?: ReviewDecisionOrderByRelationAggregateInput
    caseNotes?: CaseNoteOrderByRelationAggregateInput
    auditEvents?: AuditEventOrderByRelationAggregateInput
    matchesAsA?: MatchEvidenceOrderByRelationAggregateInput
    matchesAsB?: MatchEvidenceOrderByRelationAggregateInput
    trendSnapshots?: TrendSnapshotOrderByRelationAggregateInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    submittedById?: StringNullableFilter<"Report"> | string | null
    contentType?: StringFilter<"Report"> | string
    rawContent?: StringFilter<"Report"> | string
    publicSummary?: StringNullableFilter<"Report"> | string | null
    platform?: StringNullableFilter<"Report"> | string | null
    targetRegion?: StringNullableFilter<"Report"> | string | null
    riskLevel?: EnumRiskLevelFilter<"Report"> | $Enums.RiskLevel
    riskScore?: FloatFilter<"Report"> | number
    evidenceJson?: JsonNullableFilter<"Report">
    storyModeJson?: JsonNullableFilter<"Report">
    nextStepsJson?: JsonNullableFilter<"Report">
    caveat?: StringNullableFilter<"Report"> | string | null
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFilter<"Report"> | $Enums.SourceType
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    submittedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    indicators?: ReportIndicatorListRelationFilter
    reviewDecisions?: ReviewDecisionListRelationFilter
    caseNotes?: CaseNoteListRelationFilter
    auditEvents?: AuditEventListRelationFilter
    matchesAsA?: MatchEvidenceListRelationFilter
    matchesAsB?: MatchEvidenceListRelationFilter
    trendSnapshots?: TrendSnapshotListRelationFilter
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    submittedById?: SortOrderInput | SortOrder
    contentType?: SortOrder
    rawContent?: SortOrder
    publicSummary?: SortOrderInput | SortOrder
    platform?: SortOrderInput | SortOrder
    targetRegion?: SortOrderInput | SortOrder
    riskLevel?: SortOrder
    riskScore?: SortOrder
    evidenceJson?: SortOrderInput | SortOrder
    storyModeJson?: SortOrderInput | SortOrder
    nextStepsJson?: SortOrderInput | SortOrder
    caveat?: SortOrderInput | SortOrder
    status?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    submittedById?: StringNullableWithAggregatesFilter<"Report"> | string | null
    contentType?: StringWithAggregatesFilter<"Report"> | string
    rawContent?: StringWithAggregatesFilter<"Report"> | string
    publicSummary?: StringNullableWithAggregatesFilter<"Report"> | string | null
    platform?: StringNullableWithAggregatesFilter<"Report"> | string | null
    targetRegion?: StringNullableWithAggregatesFilter<"Report"> | string | null
    riskLevel?: EnumRiskLevelWithAggregatesFilter<"Report"> | $Enums.RiskLevel
    riskScore?: FloatWithAggregatesFilter<"Report"> | number
    evidenceJson?: JsonNullableWithAggregatesFilter<"Report">
    storyModeJson?: JsonNullableWithAggregatesFilter<"Report">
    nextStepsJson?: JsonNullableWithAggregatesFilter<"Report">
    caveat?: StringNullableWithAggregatesFilter<"Report"> | string | null
    status?: EnumReportStatusWithAggregatesFilter<"Report"> | $Enums.ReportStatus
    sourceType?: EnumSourceTypeWithAggregatesFilter<"Report"> | $Enums.SourceType
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type IndicatorWhereInput = {
    AND?: IndicatorWhereInput | IndicatorWhereInput[]
    OR?: IndicatorWhereInput[]
    NOT?: IndicatorWhereInput | IndicatorWhereInput[]
    id?: StringFilter<"Indicator"> | string
    type?: EnumIndicatorTypeFilter<"Indicator"> | $Enums.IndicatorType
    value?: StringFilter<"Indicator"> | string
    metadata?: JsonNullableFilter<"Indicator">
    createdAt?: DateTimeFilter<"Indicator"> | Date | string
    reports?: ReportIndicatorListRelationFilter
  }

  export type IndicatorOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    value?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    reports?: ReportIndicatorOrderByRelationAggregateInput
  }

  export type IndicatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    type_value?: IndicatorTypeValueCompoundUniqueInput
    AND?: IndicatorWhereInput | IndicatorWhereInput[]
    OR?: IndicatorWhereInput[]
    NOT?: IndicatorWhereInput | IndicatorWhereInput[]
    type?: EnumIndicatorTypeFilter<"Indicator"> | $Enums.IndicatorType
    value?: StringFilter<"Indicator"> | string
    metadata?: JsonNullableFilter<"Indicator">
    createdAt?: DateTimeFilter<"Indicator"> | Date | string
    reports?: ReportIndicatorListRelationFilter
  }, "id" | "type_value">

  export type IndicatorOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    value?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: IndicatorCountOrderByAggregateInput
    _max?: IndicatorMaxOrderByAggregateInput
    _min?: IndicatorMinOrderByAggregateInput
  }

  export type IndicatorScalarWhereWithAggregatesInput = {
    AND?: IndicatorScalarWhereWithAggregatesInput | IndicatorScalarWhereWithAggregatesInput[]
    OR?: IndicatorScalarWhereWithAggregatesInput[]
    NOT?: IndicatorScalarWhereWithAggregatesInput | IndicatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Indicator"> | string
    type?: EnumIndicatorTypeWithAggregatesFilter<"Indicator"> | $Enums.IndicatorType
    value?: StringWithAggregatesFilter<"Indicator"> | string
    metadata?: JsonNullableWithAggregatesFilter<"Indicator">
    createdAt?: DateTimeWithAggregatesFilter<"Indicator"> | Date | string
  }

  export type ReportIndicatorWhereInput = {
    AND?: ReportIndicatorWhereInput | ReportIndicatorWhereInput[]
    OR?: ReportIndicatorWhereInput[]
    NOT?: ReportIndicatorWhereInput | ReportIndicatorWhereInput[]
    id?: StringFilter<"ReportIndicator"> | string
    reportId?: StringFilter<"ReportIndicator"> | string
    indicatorId?: StringFilter<"ReportIndicator"> | string
    context?: StringNullableFilter<"ReportIndicator"> | string | null
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    indicator?: XOR<IndicatorScalarRelationFilter, IndicatorWhereInput>
  }

  export type ReportIndicatorOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    indicatorId?: SortOrder
    context?: SortOrderInput | SortOrder
    report?: ReportOrderByWithRelationInput
    indicator?: IndicatorOrderByWithRelationInput
  }

  export type ReportIndicatorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reportId_indicatorId?: ReportIndicatorReportIdIndicatorIdCompoundUniqueInput
    AND?: ReportIndicatorWhereInput | ReportIndicatorWhereInput[]
    OR?: ReportIndicatorWhereInput[]
    NOT?: ReportIndicatorWhereInput | ReportIndicatorWhereInput[]
    reportId?: StringFilter<"ReportIndicator"> | string
    indicatorId?: StringFilter<"ReportIndicator"> | string
    context?: StringNullableFilter<"ReportIndicator"> | string | null
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    indicator?: XOR<IndicatorScalarRelationFilter, IndicatorWhereInput>
  }, "id" | "reportId_indicatorId">

  export type ReportIndicatorOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    indicatorId?: SortOrder
    context?: SortOrderInput | SortOrder
    _count?: ReportIndicatorCountOrderByAggregateInput
    _max?: ReportIndicatorMaxOrderByAggregateInput
    _min?: ReportIndicatorMinOrderByAggregateInput
  }

  export type ReportIndicatorScalarWhereWithAggregatesInput = {
    AND?: ReportIndicatorScalarWhereWithAggregatesInput | ReportIndicatorScalarWhereWithAggregatesInput[]
    OR?: ReportIndicatorScalarWhereWithAggregatesInput[]
    NOT?: ReportIndicatorScalarWhereWithAggregatesInput | ReportIndicatorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReportIndicator"> | string
    reportId?: StringWithAggregatesFilter<"ReportIndicator"> | string
    indicatorId?: StringWithAggregatesFilter<"ReportIndicator"> | string
    context?: StringNullableWithAggregatesFilter<"ReportIndicator"> | string | null
  }

  export type MatchEvidenceWhereInput = {
    AND?: MatchEvidenceWhereInput | MatchEvidenceWhereInput[]
    OR?: MatchEvidenceWhereInput[]
    NOT?: MatchEvidenceWhereInput | MatchEvidenceWhereInput[]
    id?: StringFilter<"MatchEvidence"> | string
    reportAId?: StringFilter<"MatchEvidence"> | string
    reportBId?: StringFilter<"MatchEvidence"> | string
    similarityScore?: FloatFilter<"MatchEvidence"> | number
    matchedClues?: JsonFilter<"MatchEvidence">
    differences?: JsonFilter<"MatchEvidence">
    createdAt?: DateTimeFilter<"MatchEvidence"> | Date | string
    reportA?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    reportB?: XOR<ReportScalarRelationFilter, ReportWhereInput>
  }

  export type MatchEvidenceOrderByWithRelationInput = {
    id?: SortOrder
    reportAId?: SortOrder
    reportBId?: SortOrder
    similarityScore?: SortOrder
    matchedClues?: SortOrder
    differences?: SortOrder
    createdAt?: SortOrder
    reportA?: ReportOrderByWithRelationInput
    reportB?: ReportOrderByWithRelationInput
  }

  export type MatchEvidenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    reportAId_reportBId?: MatchEvidenceReportAIdReportBIdCompoundUniqueInput
    AND?: MatchEvidenceWhereInput | MatchEvidenceWhereInput[]
    OR?: MatchEvidenceWhereInput[]
    NOT?: MatchEvidenceWhereInput | MatchEvidenceWhereInput[]
    reportAId?: StringFilter<"MatchEvidence"> | string
    reportBId?: StringFilter<"MatchEvidence"> | string
    similarityScore?: FloatFilter<"MatchEvidence"> | number
    matchedClues?: JsonFilter<"MatchEvidence">
    differences?: JsonFilter<"MatchEvidence">
    createdAt?: DateTimeFilter<"MatchEvidence"> | Date | string
    reportA?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    reportB?: XOR<ReportScalarRelationFilter, ReportWhereInput>
  }, "id" | "reportAId_reportBId">

  export type MatchEvidenceOrderByWithAggregationInput = {
    id?: SortOrder
    reportAId?: SortOrder
    reportBId?: SortOrder
    similarityScore?: SortOrder
    matchedClues?: SortOrder
    differences?: SortOrder
    createdAt?: SortOrder
    _count?: MatchEvidenceCountOrderByAggregateInput
    _avg?: MatchEvidenceAvgOrderByAggregateInput
    _max?: MatchEvidenceMaxOrderByAggregateInput
    _min?: MatchEvidenceMinOrderByAggregateInput
    _sum?: MatchEvidenceSumOrderByAggregateInput
  }

  export type MatchEvidenceScalarWhereWithAggregatesInput = {
    AND?: MatchEvidenceScalarWhereWithAggregatesInput | MatchEvidenceScalarWhereWithAggregatesInput[]
    OR?: MatchEvidenceScalarWhereWithAggregatesInput[]
    NOT?: MatchEvidenceScalarWhereWithAggregatesInput | MatchEvidenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchEvidence"> | string
    reportAId?: StringWithAggregatesFilter<"MatchEvidence"> | string
    reportBId?: StringWithAggregatesFilter<"MatchEvidence"> | string
    similarityScore?: FloatWithAggregatesFilter<"MatchEvidence"> | number
    matchedClues?: JsonWithAggregatesFilter<"MatchEvidence">
    differences?: JsonWithAggregatesFilter<"MatchEvidence">
    createdAt?: DateTimeWithAggregatesFilter<"MatchEvidence"> | Date | string
  }

  export type ReviewDecisionWhereInput = {
    AND?: ReviewDecisionWhereInput | ReviewDecisionWhereInput[]
    OR?: ReviewDecisionWhereInput[]
    NOT?: ReviewDecisionWhereInput | ReviewDecisionWhereInput[]
    id?: StringFilter<"ReviewDecision"> | string
    reportId?: StringFilter<"ReviewDecision"> | string
    reviewerId?: StringFilter<"ReviewDecision"> | string
    status?: EnumReportStatusFilter<"ReviewDecision"> | $Enums.ReportStatus
    rationale?: StringFilter<"ReviewDecision"> | string
    redactions?: JsonNullableFilter<"ReviewDecision">
    createdAt?: DateTimeFilter<"ReviewDecision"> | Date | string
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReviewDecisionOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    reviewerId?: SortOrder
    status?: SortOrder
    rationale?: SortOrder
    redactions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    report?: ReportOrderByWithRelationInput
    reviewer?: UserOrderByWithRelationInput
  }

  export type ReviewDecisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewDecisionWhereInput | ReviewDecisionWhereInput[]
    OR?: ReviewDecisionWhereInput[]
    NOT?: ReviewDecisionWhereInput | ReviewDecisionWhereInput[]
    reportId?: StringFilter<"ReviewDecision"> | string
    reviewerId?: StringFilter<"ReviewDecision"> | string
    status?: EnumReportStatusFilter<"ReviewDecision"> | $Enums.ReportStatus
    rationale?: StringFilter<"ReviewDecision"> | string
    redactions?: JsonNullableFilter<"ReviewDecision">
    createdAt?: DateTimeFilter<"ReviewDecision"> | Date | string
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    reviewer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReviewDecisionOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    reviewerId?: SortOrder
    status?: SortOrder
    rationale?: SortOrder
    redactions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReviewDecisionCountOrderByAggregateInput
    _max?: ReviewDecisionMaxOrderByAggregateInput
    _min?: ReviewDecisionMinOrderByAggregateInput
  }

  export type ReviewDecisionScalarWhereWithAggregatesInput = {
    AND?: ReviewDecisionScalarWhereWithAggregatesInput | ReviewDecisionScalarWhereWithAggregatesInput[]
    OR?: ReviewDecisionScalarWhereWithAggregatesInput[]
    NOT?: ReviewDecisionScalarWhereWithAggregatesInput | ReviewDecisionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReviewDecision"> | string
    reportId?: StringWithAggregatesFilter<"ReviewDecision"> | string
    reviewerId?: StringWithAggregatesFilter<"ReviewDecision"> | string
    status?: EnumReportStatusWithAggregatesFilter<"ReviewDecision"> | $Enums.ReportStatus
    rationale?: StringWithAggregatesFilter<"ReviewDecision"> | string
    redactions?: JsonNullableWithAggregatesFilter<"ReviewDecision">
    createdAt?: DateTimeWithAggregatesFilter<"ReviewDecision"> | Date | string
  }

  export type CaseNoteWhereInput = {
    AND?: CaseNoteWhereInput | CaseNoteWhereInput[]
    OR?: CaseNoteWhereInput[]
    NOT?: CaseNoteWhereInput | CaseNoteWhereInput[]
    id?: StringFilter<"CaseNote"> | string
    reportId?: StringFilter<"CaseNote"> | string
    authorId?: StringFilter<"CaseNote"> | string
    content?: StringFilter<"CaseNote"> | string
    createdAt?: DateTimeFilter<"CaseNote"> | Date | string
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CaseNoteOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    authorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    report?: ReportOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type CaseNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CaseNoteWhereInput | CaseNoteWhereInput[]
    OR?: CaseNoteWhereInput[]
    NOT?: CaseNoteWhereInput | CaseNoteWhereInput[]
    reportId?: StringFilter<"CaseNote"> | string
    authorId?: StringFilter<"CaseNote"> | string
    content?: StringFilter<"CaseNote"> | string
    createdAt?: DateTimeFilter<"CaseNote"> | Date | string
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CaseNoteOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    authorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: CaseNoteCountOrderByAggregateInput
    _max?: CaseNoteMaxOrderByAggregateInput
    _min?: CaseNoteMinOrderByAggregateInput
  }

  export type CaseNoteScalarWhereWithAggregatesInput = {
    AND?: CaseNoteScalarWhereWithAggregatesInput | CaseNoteScalarWhereWithAggregatesInput[]
    OR?: CaseNoteScalarWhereWithAggregatesInput[]
    NOT?: CaseNoteScalarWhereWithAggregatesInput | CaseNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CaseNote"> | string
    reportId?: StringWithAggregatesFilter<"CaseNote"> | string
    authorId?: StringWithAggregatesFilter<"CaseNote"> | string
    content?: StringWithAggregatesFilter<"CaseNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CaseNote"> | Date | string
  }

  export type AuditEventWhereInput = {
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    id?: StringFilter<"AuditEvent"> | string
    userId?: StringNullableFilter<"AuditEvent"> | string | null
    reportId?: StringNullableFilter<"AuditEvent"> | string | null
    action?: EnumAuditActionFilter<"AuditEvent"> | $Enums.AuditAction
    detail?: JsonNullableFilter<"AuditEvent">
    createdAt?: DateTimeFilter<"AuditEvent"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
  }

  export type AuditEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    action?: SortOrder
    detail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    report?: ReportOrderByWithRelationInput
  }

  export type AuditEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    userId?: StringNullableFilter<"AuditEvent"> | string | null
    reportId?: StringNullableFilter<"AuditEvent"> | string | null
    action?: EnumAuditActionFilter<"AuditEvent"> | $Enums.AuditAction
    detail?: JsonNullableFilter<"AuditEvent">
    createdAt?: DateTimeFilter<"AuditEvent"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
  }, "id">

  export type AuditEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    action?: SortOrder
    detail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditEventCountOrderByAggregateInput
    _max?: AuditEventMaxOrderByAggregateInput
    _min?: AuditEventMinOrderByAggregateInput
  }

  export type AuditEventScalarWhereWithAggregatesInput = {
    AND?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    OR?: AuditEventScalarWhereWithAggregatesInput[]
    NOT?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditEvent"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    reportId?: StringNullableWithAggregatesFilter<"AuditEvent"> | string | null
    action?: EnumAuditActionWithAggregatesFilter<"AuditEvent"> | $Enums.AuditAction
    detail?: JsonNullableWithAggregatesFilter<"AuditEvent">
    createdAt?: DateTimeWithAggregatesFilter<"AuditEvent"> | Date | string
  }

  export type TrendSnapshotWhereInput = {
    AND?: TrendSnapshotWhereInput | TrendSnapshotWhereInput[]
    OR?: TrendSnapshotWhereInput[]
    NOT?: TrendSnapshotWhereInput | TrendSnapshotWhereInput[]
    id?: StringFilter<"TrendSnapshot"> | string
    date?: DateTimeFilter<"TrendSnapshot"> | Date | string
    contentType?: StringNullableFilter<"TrendSnapshot"> | string | null
    riskLevel?: EnumRiskLevelNullableFilter<"TrendSnapshot"> | $Enums.RiskLevel | null
    tactic?: StringNullableFilter<"TrendSnapshot"> | string | null
    reportCount?: IntFilter<"TrendSnapshot"> | number
    sampleReport?: StringNullableFilter<"TrendSnapshot"> | string | null
    reportId?: StringNullableFilter<"TrendSnapshot"> | string | null
    createdAt?: DateTimeFilter<"TrendSnapshot"> | Date | string
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
  }

  export type TrendSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    contentType?: SortOrderInput | SortOrder
    riskLevel?: SortOrderInput | SortOrder
    tactic?: SortOrderInput | SortOrder
    reportCount?: SortOrder
    sampleReport?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    report?: ReportOrderByWithRelationInput
  }

  export type TrendSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrendSnapshotWhereInput | TrendSnapshotWhereInput[]
    OR?: TrendSnapshotWhereInput[]
    NOT?: TrendSnapshotWhereInput | TrendSnapshotWhereInput[]
    date?: DateTimeFilter<"TrendSnapshot"> | Date | string
    contentType?: StringNullableFilter<"TrendSnapshot"> | string | null
    riskLevel?: EnumRiskLevelNullableFilter<"TrendSnapshot"> | $Enums.RiskLevel | null
    tactic?: StringNullableFilter<"TrendSnapshot"> | string | null
    reportCount?: IntFilter<"TrendSnapshot"> | number
    sampleReport?: StringNullableFilter<"TrendSnapshot"> | string | null
    reportId?: StringNullableFilter<"TrendSnapshot"> | string | null
    createdAt?: DateTimeFilter<"TrendSnapshot"> | Date | string
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
  }, "id">

  export type TrendSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    contentType?: SortOrderInput | SortOrder
    riskLevel?: SortOrderInput | SortOrder
    tactic?: SortOrderInput | SortOrder
    reportCount?: SortOrder
    sampleReport?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TrendSnapshotCountOrderByAggregateInput
    _avg?: TrendSnapshotAvgOrderByAggregateInput
    _max?: TrendSnapshotMaxOrderByAggregateInput
    _min?: TrendSnapshotMinOrderByAggregateInput
    _sum?: TrendSnapshotSumOrderByAggregateInput
  }

  export type TrendSnapshotScalarWhereWithAggregatesInput = {
    AND?: TrendSnapshotScalarWhereWithAggregatesInput | TrendSnapshotScalarWhereWithAggregatesInput[]
    OR?: TrendSnapshotScalarWhereWithAggregatesInput[]
    NOT?: TrendSnapshotScalarWhereWithAggregatesInput | TrendSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrendSnapshot"> | string
    date?: DateTimeWithAggregatesFilter<"TrendSnapshot"> | Date | string
    contentType?: StringNullableWithAggregatesFilter<"TrendSnapshot"> | string | null
    riskLevel?: EnumRiskLevelNullableWithAggregatesFilter<"TrendSnapshot"> | $Enums.RiskLevel | null
    tactic?: StringNullableWithAggregatesFilter<"TrendSnapshot"> | string | null
    reportCount?: IntWithAggregatesFilter<"TrendSnapshot"> | number
    sampleReport?: StringNullableWithAggregatesFilter<"TrendSnapshot"> | string | null
    reportId?: StringNullableWithAggregatesFilter<"TrendSnapshot"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TrendSnapshot"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutSubmittedByInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReviewerInput
    caseNotes?: CaseNoteCreateNestedManyWithoutAuthorInput
    auditEvents?: AuditEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutSubmittedByInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReviewerInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutAuthorInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutSubmittedByNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReviewerNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutAuthorNestedInput
    auditEvents?: AuditEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutSubmittedByNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReviewerNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutAuthorNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndicatorCreateInput = {
    id?: string
    type: $Enums.IndicatorType
    value: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reports?: ReportIndicatorCreateNestedManyWithoutIndicatorInput
  }

  export type IndicatorUncheckedCreateInput = {
    id?: string
    type: $Enums.IndicatorType
    value: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reports?: ReportIndicatorUncheckedCreateNestedManyWithoutIndicatorInput
  }

  export type IndicatorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumIndicatorTypeFieldUpdateOperationsInput | $Enums.IndicatorType
    value?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportIndicatorUpdateManyWithoutIndicatorNestedInput
  }

  export type IndicatorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumIndicatorTypeFieldUpdateOperationsInput | $Enums.IndicatorType
    value?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportIndicatorUncheckedUpdateManyWithoutIndicatorNestedInput
  }

  export type IndicatorCreateManyInput = {
    id?: string
    type: $Enums.IndicatorType
    value: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IndicatorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumIndicatorTypeFieldUpdateOperationsInput | $Enums.IndicatorType
    value?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndicatorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumIndicatorTypeFieldUpdateOperationsInput | $Enums.IndicatorType
    value?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportIndicatorCreateInput = {
    id?: string
    context?: string | null
    report: ReportCreateNestedOneWithoutIndicatorsInput
    indicator: IndicatorCreateNestedOneWithoutReportsInput
  }

  export type ReportIndicatorUncheckedCreateInput = {
    id?: string
    reportId: string
    indicatorId: string
    context?: string | null
  }

  export type ReportIndicatorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    report?: ReportUpdateOneRequiredWithoutIndicatorsNestedInput
    indicator?: IndicatorUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportIndicatorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    indicatorId?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportIndicatorCreateManyInput = {
    id?: string
    reportId: string
    indicatorId: string
    context?: string | null
  }

  export type ReportIndicatorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportIndicatorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    indicatorId?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MatchEvidenceCreateInput = {
    id?: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reportA: ReportCreateNestedOneWithoutMatchesAsAInput
    reportB: ReportCreateNestedOneWithoutMatchesAsBInput
  }

  export type MatchEvidenceUncheckedCreateInput = {
    id?: string
    reportAId: string
    reportBId: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MatchEvidenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportA?: ReportUpdateOneRequiredWithoutMatchesAsANestedInput
    reportB?: ReportUpdateOneRequiredWithoutMatchesAsBNestedInput
  }

  export type MatchEvidenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportAId?: StringFieldUpdateOperationsInput | string
    reportBId?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEvidenceCreateManyInput = {
    id?: string
    reportAId: string
    reportBId: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MatchEvidenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEvidenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportAId?: StringFieldUpdateOperationsInput | string
    reportBId?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewDecisionCreateInput = {
    id?: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    report: ReportCreateNestedOneWithoutReviewDecisionsInput
    reviewer: UserCreateNestedOneWithoutReviewDecisionsInput
  }

  export type ReviewDecisionUncheckedCreateInput = {
    id?: string
    reportId: string
    reviewerId: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReviewDecisionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutReviewDecisionsNestedInput
    reviewer?: UserUpdateOneRequiredWithoutReviewDecisionsNestedInput
  }

  export type ReviewDecisionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewDecisionCreateManyInput = {
    id?: string
    reportId: string
    reviewerId: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReviewDecisionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewDecisionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseNoteCreateInput = {
    id?: string
    content: string
    createdAt?: Date | string
    report: ReportCreateNestedOneWithoutCaseNotesInput
    author: UserCreateNestedOneWithoutCaseNotesInput
  }

  export type CaseNoteUncheckedCreateInput = {
    id?: string
    reportId: string
    authorId: string
    content: string
    createdAt?: Date | string
  }

  export type CaseNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutCaseNotesNestedInput
    author?: UserUpdateOneRequiredWithoutCaseNotesNestedInput
  }

  export type CaseNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseNoteCreateManyInput = {
    id?: string
    reportId: string
    authorId: string
    content: string
    createdAt?: Date | string
  }

  export type CaseNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateInput = {
    id?: string
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditEventsInput
    report?: ReportCreateNestedOneWithoutAuditEventsInput
  }

  export type AuditEventUncheckedCreateInput = {
    id?: string
    userId?: string | null
    reportId?: string | null
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditEventsNestedInput
    report?: ReportUpdateOneWithoutAuditEventsNestedInput
  }

  export type AuditEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateManyInput = {
    id?: string
    userId?: string | null
    reportId?: string | null
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrendSnapshotCreateInput = {
    id?: string
    date: Date | string
    contentType?: string | null
    riskLevel?: $Enums.RiskLevel | null
    tactic?: string | null
    reportCount?: number
    sampleReport?: string | null
    createdAt?: Date | string
    report?: ReportCreateNestedOneWithoutTrendSnapshotsInput
  }

  export type TrendSnapshotUncheckedCreateInput = {
    id?: string
    date: Date | string
    contentType?: string | null
    riskLevel?: $Enums.RiskLevel | null
    tactic?: string | null
    reportCount?: number
    sampleReport?: string | null
    reportId?: string | null
    createdAt?: Date | string
  }

  export type TrendSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableEnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel | null
    tactic?: NullableStringFieldUpdateOperationsInput | string | null
    reportCount?: IntFieldUpdateOperationsInput | number
    sampleReport?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneWithoutTrendSnapshotsNestedInput
  }

  export type TrendSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableEnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel | null
    tactic?: NullableStringFieldUpdateOperationsInput | string | null
    reportCount?: IntFieldUpdateOperationsInput | number
    sampleReport?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrendSnapshotCreateManyInput = {
    id?: string
    date: Date | string
    contentType?: string | null
    riskLevel?: $Enums.RiskLevel | null
    tactic?: string | null
    reportCount?: number
    sampleReport?: string | null
    reportId?: string | null
    createdAt?: Date | string
  }

  export type TrendSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableEnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel | null
    tactic?: NullableStringFieldUpdateOperationsInput | string | null
    reportCount?: IntFieldUpdateOperationsInput | number
    sampleReport?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrendSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableEnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel | null
    tactic?: NullableStringFieldUpdateOperationsInput | string | null
    reportCount?: IntFieldUpdateOperationsInput | number
    sampleReport?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type ReviewDecisionListRelationFilter = {
    every?: ReviewDecisionWhereInput
    some?: ReviewDecisionWhereInput
    none?: ReviewDecisionWhereInput
  }

  export type CaseNoteListRelationFilter = {
    every?: CaseNoteWhereInput
    some?: CaseNoteWhereInput
    none?: CaseNoteWhereInput
  }

  export type AuditEventListRelationFilter = {
    every?: AuditEventWhereInput
    some?: AuditEventWhereInput
    none?: AuditEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewDecisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CaseNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    googleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRiskLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelFilter<$PrismaModel> | $Enums.RiskLevel
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type EnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ReportIndicatorListRelationFilter = {
    every?: ReportIndicatorWhereInput
    some?: ReportIndicatorWhereInput
    none?: ReportIndicatorWhereInput
  }

  export type MatchEvidenceListRelationFilter = {
    every?: MatchEvidenceWhereInput
    some?: MatchEvidenceWhereInput
    none?: MatchEvidenceWhereInput
  }

  export type TrendSnapshotListRelationFilter = {
    every?: TrendSnapshotWhereInput
    some?: TrendSnapshotWhereInput
    none?: TrendSnapshotWhereInput
  }

  export type ReportIndicatorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchEvidenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrendSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    submittedById?: SortOrder
    contentType?: SortOrder
    rawContent?: SortOrder
    publicSummary?: SortOrder
    platform?: SortOrder
    targetRegion?: SortOrder
    riskLevel?: SortOrder
    riskScore?: SortOrder
    evidenceJson?: SortOrder
    storyModeJson?: SortOrder
    nextStepsJson?: SortOrder
    caveat?: SortOrder
    status?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    submittedById?: SortOrder
    contentType?: SortOrder
    rawContent?: SortOrder
    publicSummary?: SortOrder
    platform?: SortOrder
    targetRegion?: SortOrder
    riskLevel?: SortOrder
    riskScore?: SortOrder
    caveat?: SortOrder
    status?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    submittedById?: SortOrder
    contentType?: SortOrder
    rawContent?: SortOrder
    publicSummary?: SortOrder
    platform?: SortOrder
    targetRegion?: SortOrder
    riskLevel?: SortOrder
    riskScore?: SortOrder
    caveat?: SortOrder
    status?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    riskScore?: SortOrder
  }

  export type EnumRiskLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type EnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type EnumIndicatorTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.IndicatorType | EnumIndicatorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndicatorTypeFilter<$PrismaModel> | $Enums.IndicatorType
  }

  export type IndicatorTypeValueCompoundUniqueInput = {
    type: $Enums.IndicatorType
    value: string
  }

  export type IndicatorCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    value?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type IndicatorMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type IndicatorMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumIndicatorTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IndicatorType | EnumIndicatorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndicatorTypeWithAggregatesFilter<$PrismaModel> | $Enums.IndicatorType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIndicatorTypeFilter<$PrismaModel>
    _max?: NestedEnumIndicatorTypeFilter<$PrismaModel>
  }

  export type ReportScalarRelationFilter = {
    is?: ReportWhereInput
    isNot?: ReportWhereInput
  }

  export type IndicatorScalarRelationFilter = {
    is?: IndicatorWhereInput
    isNot?: IndicatorWhereInput
  }

  export type ReportIndicatorReportIdIndicatorIdCompoundUniqueInput = {
    reportId: string
    indicatorId: string
  }

  export type ReportIndicatorCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    indicatorId?: SortOrder
    context?: SortOrder
  }

  export type ReportIndicatorMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    indicatorId?: SortOrder
    context?: SortOrder
  }

  export type ReportIndicatorMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    indicatorId?: SortOrder
    context?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MatchEvidenceReportAIdReportBIdCompoundUniqueInput = {
    reportAId: string
    reportBId: string
  }

  export type MatchEvidenceCountOrderByAggregateInput = {
    id?: SortOrder
    reportAId?: SortOrder
    reportBId?: SortOrder
    similarityScore?: SortOrder
    matchedClues?: SortOrder
    differences?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchEvidenceAvgOrderByAggregateInput = {
    similarityScore?: SortOrder
  }

  export type MatchEvidenceMaxOrderByAggregateInput = {
    id?: SortOrder
    reportAId?: SortOrder
    reportBId?: SortOrder
    similarityScore?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchEvidenceMinOrderByAggregateInput = {
    id?: SortOrder
    reportAId?: SortOrder
    reportBId?: SortOrder
    similarityScore?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchEvidenceSumOrderByAggregateInput = {
    similarityScore?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReviewDecisionCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    reviewerId?: SortOrder
    status?: SortOrder
    rationale?: SortOrder
    redactions?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewDecisionMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    reviewerId?: SortOrder
    status?: SortOrder
    rationale?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewDecisionMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    reviewerId?: SortOrder
    status?: SortOrder
    rationale?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseNoteCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    authorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    authorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CaseNoteMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    authorId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type ReportNullableScalarRelationFilter = {
    is?: ReportWhereInput | null
    isNot?: ReportWhereInput | null
  }

  export type AuditEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reportId?: SortOrder
    action?: SortOrder
    detail?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reportId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reportId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }

  export type EnumRiskLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskLevelNullableFilter<$PrismaModel> | $Enums.RiskLevel | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TrendSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    contentType?: SortOrder
    riskLevel?: SortOrder
    tactic?: SortOrder
    reportCount?: SortOrder
    sampleReport?: SortOrder
    reportId?: SortOrder
    createdAt?: SortOrder
  }

  export type TrendSnapshotAvgOrderByAggregateInput = {
    reportCount?: SortOrder
  }

  export type TrendSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    contentType?: SortOrder
    riskLevel?: SortOrder
    tactic?: SortOrder
    reportCount?: SortOrder
    sampleReport?: SortOrder
    reportId?: SortOrder
    createdAt?: SortOrder
  }

  export type TrendSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    contentType?: SortOrder
    riskLevel?: SortOrder
    tactic?: SortOrder
    reportCount?: SortOrder
    sampleReport?: SortOrder
    reportId?: SortOrder
    createdAt?: SortOrder
  }

  export type TrendSnapshotSumOrderByAggregateInput = {
    reportCount?: SortOrder
  }

  export type EnumRiskLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ReportCreateNestedManyWithoutSubmittedByInput = {
    create?: XOR<ReportCreateWithoutSubmittedByInput, ReportUncheckedCreateWithoutSubmittedByInput> | ReportCreateWithoutSubmittedByInput[] | ReportUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutSubmittedByInput | ReportCreateOrConnectWithoutSubmittedByInput[]
    createMany?: ReportCreateManySubmittedByInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReviewDecisionCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewDecisionCreateWithoutReviewerInput, ReviewDecisionUncheckedCreateWithoutReviewerInput> | ReviewDecisionCreateWithoutReviewerInput[] | ReviewDecisionUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReviewerInput | ReviewDecisionCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewDecisionCreateManyReviewerInputEnvelope
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
  }

  export type CaseNoteCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CaseNoteCreateWithoutAuthorInput, CaseNoteUncheckedCreateWithoutAuthorInput> | CaseNoteCreateWithoutAuthorInput[] | CaseNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutAuthorInput | CaseNoteCreateOrConnectWithoutAuthorInput[]
    createMany?: CaseNoteCreateManyAuthorInputEnvelope
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
  }

  export type AuditEventCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditEventCreateWithoutUserInput, AuditEventUncheckedCreateWithoutUserInput> | AuditEventCreateWithoutUserInput[] | AuditEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutUserInput | AuditEventCreateOrConnectWithoutUserInput[]
    createMany?: AuditEventCreateManyUserInputEnvelope
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutSubmittedByInput = {
    create?: XOR<ReportCreateWithoutSubmittedByInput, ReportUncheckedCreateWithoutSubmittedByInput> | ReportCreateWithoutSubmittedByInput[] | ReportUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutSubmittedByInput | ReportCreateOrConnectWithoutSubmittedByInput[]
    createMany?: ReportCreateManySubmittedByInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReviewDecisionUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: XOR<ReviewDecisionCreateWithoutReviewerInput, ReviewDecisionUncheckedCreateWithoutReviewerInput> | ReviewDecisionCreateWithoutReviewerInput[] | ReviewDecisionUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReviewerInput | ReviewDecisionCreateOrConnectWithoutReviewerInput[]
    createMany?: ReviewDecisionCreateManyReviewerInputEnvelope
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
  }

  export type CaseNoteUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CaseNoteCreateWithoutAuthorInput, CaseNoteUncheckedCreateWithoutAuthorInput> | CaseNoteCreateWithoutAuthorInput[] | CaseNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutAuthorInput | CaseNoteCreateOrConnectWithoutAuthorInput[]
    createMany?: CaseNoteCreateManyAuthorInputEnvelope
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
  }

  export type AuditEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditEventCreateWithoutUserInput, AuditEventUncheckedCreateWithoutUserInput> | AuditEventCreateWithoutUserInput[] | AuditEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutUserInput | AuditEventCreateOrConnectWithoutUserInput[]
    createMany?: AuditEventCreateManyUserInputEnvelope
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReportUpdateManyWithoutSubmittedByNestedInput = {
    create?: XOR<ReportCreateWithoutSubmittedByInput, ReportUncheckedCreateWithoutSubmittedByInput> | ReportCreateWithoutSubmittedByInput[] | ReportUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutSubmittedByInput | ReportCreateOrConnectWithoutSubmittedByInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutSubmittedByInput | ReportUpsertWithWhereUniqueWithoutSubmittedByInput[]
    createMany?: ReportCreateManySubmittedByInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutSubmittedByInput | ReportUpdateWithWhereUniqueWithoutSubmittedByInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutSubmittedByInput | ReportUpdateManyWithWhereWithoutSubmittedByInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReviewDecisionUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewDecisionCreateWithoutReviewerInput, ReviewDecisionUncheckedCreateWithoutReviewerInput> | ReviewDecisionCreateWithoutReviewerInput[] | ReviewDecisionUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReviewerInput | ReviewDecisionCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewDecisionUpsertWithWhereUniqueWithoutReviewerInput | ReviewDecisionUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewDecisionCreateManyReviewerInputEnvelope
    set?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    disconnect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    delete?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    update?: ReviewDecisionUpdateWithWhereUniqueWithoutReviewerInput | ReviewDecisionUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewDecisionUpdateManyWithWhereWithoutReviewerInput | ReviewDecisionUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewDecisionScalarWhereInput | ReviewDecisionScalarWhereInput[]
  }

  export type CaseNoteUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CaseNoteCreateWithoutAuthorInput, CaseNoteUncheckedCreateWithoutAuthorInput> | CaseNoteCreateWithoutAuthorInput[] | CaseNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutAuthorInput | CaseNoteCreateOrConnectWithoutAuthorInput[]
    upsert?: CaseNoteUpsertWithWhereUniqueWithoutAuthorInput | CaseNoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CaseNoteCreateManyAuthorInputEnvelope
    set?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    disconnect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    delete?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    update?: CaseNoteUpdateWithWhereUniqueWithoutAuthorInput | CaseNoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CaseNoteUpdateManyWithWhereWithoutAuthorInput | CaseNoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CaseNoteScalarWhereInput | CaseNoteScalarWhereInput[]
  }

  export type AuditEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditEventCreateWithoutUserInput, AuditEventUncheckedCreateWithoutUserInput> | AuditEventCreateWithoutUserInput[] | AuditEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutUserInput | AuditEventCreateOrConnectWithoutUserInput[]
    upsert?: AuditEventUpsertWithWhereUniqueWithoutUserInput | AuditEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditEventCreateManyUserInputEnvelope
    set?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    disconnect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    delete?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    update?: AuditEventUpdateWithWhereUniqueWithoutUserInput | AuditEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditEventUpdateManyWithWhereWithoutUserInput | AuditEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutSubmittedByNestedInput = {
    create?: XOR<ReportCreateWithoutSubmittedByInput, ReportUncheckedCreateWithoutSubmittedByInput> | ReportCreateWithoutSubmittedByInput[] | ReportUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutSubmittedByInput | ReportCreateOrConnectWithoutSubmittedByInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutSubmittedByInput | ReportUpsertWithWhereUniqueWithoutSubmittedByInput[]
    createMany?: ReportCreateManySubmittedByInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutSubmittedByInput | ReportUpdateWithWhereUniqueWithoutSubmittedByInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutSubmittedByInput | ReportUpdateManyWithWhereWithoutSubmittedByInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReviewDecisionUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<ReviewDecisionCreateWithoutReviewerInput, ReviewDecisionUncheckedCreateWithoutReviewerInput> | ReviewDecisionCreateWithoutReviewerInput[] | ReviewDecisionUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReviewerInput | ReviewDecisionCreateOrConnectWithoutReviewerInput[]
    upsert?: ReviewDecisionUpsertWithWhereUniqueWithoutReviewerInput | ReviewDecisionUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: ReviewDecisionCreateManyReviewerInputEnvelope
    set?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    disconnect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    delete?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    update?: ReviewDecisionUpdateWithWhereUniqueWithoutReviewerInput | ReviewDecisionUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: ReviewDecisionUpdateManyWithWhereWithoutReviewerInput | ReviewDecisionUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: ReviewDecisionScalarWhereInput | ReviewDecisionScalarWhereInput[]
  }

  export type CaseNoteUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CaseNoteCreateWithoutAuthorInput, CaseNoteUncheckedCreateWithoutAuthorInput> | CaseNoteCreateWithoutAuthorInput[] | CaseNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutAuthorInput | CaseNoteCreateOrConnectWithoutAuthorInput[]
    upsert?: CaseNoteUpsertWithWhereUniqueWithoutAuthorInput | CaseNoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CaseNoteCreateManyAuthorInputEnvelope
    set?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    disconnect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    delete?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    update?: CaseNoteUpdateWithWhereUniqueWithoutAuthorInput | CaseNoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CaseNoteUpdateManyWithWhereWithoutAuthorInput | CaseNoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CaseNoteScalarWhereInput | CaseNoteScalarWhereInput[]
  }

  export type AuditEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditEventCreateWithoutUserInput, AuditEventUncheckedCreateWithoutUserInput> | AuditEventCreateWithoutUserInput[] | AuditEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutUserInput | AuditEventCreateOrConnectWithoutUserInput[]
    upsert?: AuditEventUpsertWithWhereUniqueWithoutUserInput | AuditEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditEventCreateManyUserInputEnvelope
    set?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    disconnect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    delete?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    update?: AuditEventUpdateWithWhereUniqueWithoutUserInput | AuditEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditEventUpdateManyWithWhereWithoutUserInput | AuditEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutReportsInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    connect?: UserWhereUniqueInput
  }

  export type ReportIndicatorCreateNestedManyWithoutReportInput = {
    create?: XOR<ReportIndicatorCreateWithoutReportInput, ReportIndicatorUncheckedCreateWithoutReportInput> | ReportIndicatorCreateWithoutReportInput[] | ReportIndicatorUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutReportInput | ReportIndicatorCreateOrConnectWithoutReportInput[]
    createMany?: ReportIndicatorCreateManyReportInputEnvelope
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
  }

  export type ReviewDecisionCreateNestedManyWithoutReportInput = {
    create?: XOR<ReviewDecisionCreateWithoutReportInput, ReviewDecisionUncheckedCreateWithoutReportInput> | ReviewDecisionCreateWithoutReportInput[] | ReviewDecisionUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReportInput | ReviewDecisionCreateOrConnectWithoutReportInput[]
    createMany?: ReviewDecisionCreateManyReportInputEnvelope
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
  }

  export type CaseNoteCreateNestedManyWithoutReportInput = {
    create?: XOR<CaseNoteCreateWithoutReportInput, CaseNoteUncheckedCreateWithoutReportInput> | CaseNoteCreateWithoutReportInput[] | CaseNoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutReportInput | CaseNoteCreateOrConnectWithoutReportInput[]
    createMany?: CaseNoteCreateManyReportInputEnvelope
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
  }

  export type AuditEventCreateNestedManyWithoutReportInput = {
    create?: XOR<AuditEventCreateWithoutReportInput, AuditEventUncheckedCreateWithoutReportInput> | AuditEventCreateWithoutReportInput[] | AuditEventUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutReportInput | AuditEventCreateOrConnectWithoutReportInput[]
    createMany?: AuditEventCreateManyReportInputEnvelope
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
  }

  export type MatchEvidenceCreateNestedManyWithoutReportAInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportAInput, MatchEvidenceUncheckedCreateWithoutReportAInput> | MatchEvidenceCreateWithoutReportAInput[] | MatchEvidenceUncheckedCreateWithoutReportAInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportAInput | MatchEvidenceCreateOrConnectWithoutReportAInput[]
    createMany?: MatchEvidenceCreateManyReportAInputEnvelope
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
  }

  export type MatchEvidenceCreateNestedManyWithoutReportBInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportBInput, MatchEvidenceUncheckedCreateWithoutReportBInput> | MatchEvidenceCreateWithoutReportBInput[] | MatchEvidenceUncheckedCreateWithoutReportBInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportBInput | MatchEvidenceCreateOrConnectWithoutReportBInput[]
    createMany?: MatchEvidenceCreateManyReportBInputEnvelope
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
  }

  export type TrendSnapshotCreateNestedManyWithoutReportInput = {
    create?: XOR<TrendSnapshotCreateWithoutReportInput, TrendSnapshotUncheckedCreateWithoutReportInput> | TrendSnapshotCreateWithoutReportInput[] | TrendSnapshotUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TrendSnapshotCreateOrConnectWithoutReportInput | TrendSnapshotCreateOrConnectWithoutReportInput[]
    createMany?: TrendSnapshotCreateManyReportInputEnvelope
    connect?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
  }

  export type ReportIndicatorUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<ReportIndicatorCreateWithoutReportInput, ReportIndicatorUncheckedCreateWithoutReportInput> | ReportIndicatorCreateWithoutReportInput[] | ReportIndicatorUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutReportInput | ReportIndicatorCreateOrConnectWithoutReportInput[]
    createMany?: ReportIndicatorCreateManyReportInputEnvelope
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
  }

  export type ReviewDecisionUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<ReviewDecisionCreateWithoutReportInput, ReviewDecisionUncheckedCreateWithoutReportInput> | ReviewDecisionCreateWithoutReportInput[] | ReviewDecisionUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReportInput | ReviewDecisionCreateOrConnectWithoutReportInput[]
    createMany?: ReviewDecisionCreateManyReportInputEnvelope
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
  }

  export type CaseNoteUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<CaseNoteCreateWithoutReportInput, CaseNoteUncheckedCreateWithoutReportInput> | CaseNoteCreateWithoutReportInput[] | CaseNoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutReportInput | CaseNoteCreateOrConnectWithoutReportInput[]
    createMany?: CaseNoteCreateManyReportInputEnvelope
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
  }

  export type AuditEventUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<AuditEventCreateWithoutReportInput, AuditEventUncheckedCreateWithoutReportInput> | AuditEventCreateWithoutReportInput[] | AuditEventUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutReportInput | AuditEventCreateOrConnectWithoutReportInput[]
    createMany?: AuditEventCreateManyReportInputEnvelope
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
  }

  export type MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportAInput, MatchEvidenceUncheckedCreateWithoutReportAInput> | MatchEvidenceCreateWithoutReportAInput[] | MatchEvidenceUncheckedCreateWithoutReportAInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportAInput | MatchEvidenceCreateOrConnectWithoutReportAInput[]
    createMany?: MatchEvidenceCreateManyReportAInputEnvelope
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
  }

  export type MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportBInput, MatchEvidenceUncheckedCreateWithoutReportBInput> | MatchEvidenceCreateWithoutReportBInput[] | MatchEvidenceUncheckedCreateWithoutReportBInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportBInput | MatchEvidenceCreateOrConnectWithoutReportBInput[]
    createMany?: MatchEvidenceCreateManyReportBInputEnvelope
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
  }

  export type TrendSnapshotUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<TrendSnapshotCreateWithoutReportInput, TrendSnapshotUncheckedCreateWithoutReportInput> | TrendSnapshotCreateWithoutReportInput[] | TrendSnapshotUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TrendSnapshotCreateOrConnectWithoutReportInput | TrendSnapshotCreateOrConnectWithoutReportInput[]
    createMany?: TrendSnapshotCreateManyReportInputEnvelope
    connect?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
  }

  export type EnumRiskLevelFieldUpdateOperationsInput = {
    set?: $Enums.RiskLevel
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType
  }

  export type UserUpdateOneWithoutReportsNestedInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    upsert?: UserUpsertWithoutReportsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsInput, UserUpdateWithoutReportsInput>, UserUncheckedUpdateWithoutReportsInput>
  }

  export type ReportIndicatorUpdateManyWithoutReportNestedInput = {
    create?: XOR<ReportIndicatorCreateWithoutReportInput, ReportIndicatorUncheckedCreateWithoutReportInput> | ReportIndicatorCreateWithoutReportInput[] | ReportIndicatorUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutReportInput | ReportIndicatorCreateOrConnectWithoutReportInput[]
    upsert?: ReportIndicatorUpsertWithWhereUniqueWithoutReportInput | ReportIndicatorUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ReportIndicatorCreateManyReportInputEnvelope
    set?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    disconnect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    delete?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    update?: ReportIndicatorUpdateWithWhereUniqueWithoutReportInput | ReportIndicatorUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ReportIndicatorUpdateManyWithWhereWithoutReportInput | ReportIndicatorUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ReportIndicatorScalarWhereInput | ReportIndicatorScalarWhereInput[]
  }

  export type ReviewDecisionUpdateManyWithoutReportNestedInput = {
    create?: XOR<ReviewDecisionCreateWithoutReportInput, ReviewDecisionUncheckedCreateWithoutReportInput> | ReviewDecisionCreateWithoutReportInput[] | ReviewDecisionUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReportInput | ReviewDecisionCreateOrConnectWithoutReportInput[]
    upsert?: ReviewDecisionUpsertWithWhereUniqueWithoutReportInput | ReviewDecisionUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ReviewDecisionCreateManyReportInputEnvelope
    set?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    disconnect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    delete?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    update?: ReviewDecisionUpdateWithWhereUniqueWithoutReportInput | ReviewDecisionUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ReviewDecisionUpdateManyWithWhereWithoutReportInput | ReviewDecisionUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ReviewDecisionScalarWhereInput | ReviewDecisionScalarWhereInput[]
  }

  export type CaseNoteUpdateManyWithoutReportNestedInput = {
    create?: XOR<CaseNoteCreateWithoutReportInput, CaseNoteUncheckedCreateWithoutReportInput> | CaseNoteCreateWithoutReportInput[] | CaseNoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutReportInput | CaseNoteCreateOrConnectWithoutReportInput[]
    upsert?: CaseNoteUpsertWithWhereUniqueWithoutReportInput | CaseNoteUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: CaseNoteCreateManyReportInputEnvelope
    set?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    disconnect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    delete?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    update?: CaseNoteUpdateWithWhereUniqueWithoutReportInput | CaseNoteUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: CaseNoteUpdateManyWithWhereWithoutReportInput | CaseNoteUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: CaseNoteScalarWhereInput | CaseNoteScalarWhereInput[]
  }

  export type AuditEventUpdateManyWithoutReportNestedInput = {
    create?: XOR<AuditEventCreateWithoutReportInput, AuditEventUncheckedCreateWithoutReportInput> | AuditEventCreateWithoutReportInput[] | AuditEventUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutReportInput | AuditEventCreateOrConnectWithoutReportInput[]
    upsert?: AuditEventUpsertWithWhereUniqueWithoutReportInput | AuditEventUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: AuditEventCreateManyReportInputEnvelope
    set?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    disconnect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    delete?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    update?: AuditEventUpdateWithWhereUniqueWithoutReportInput | AuditEventUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: AuditEventUpdateManyWithWhereWithoutReportInput | AuditEventUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
  }

  export type MatchEvidenceUpdateManyWithoutReportANestedInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportAInput, MatchEvidenceUncheckedCreateWithoutReportAInput> | MatchEvidenceCreateWithoutReportAInput[] | MatchEvidenceUncheckedCreateWithoutReportAInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportAInput | MatchEvidenceCreateOrConnectWithoutReportAInput[]
    upsert?: MatchEvidenceUpsertWithWhereUniqueWithoutReportAInput | MatchEvidenceUpsertWithWhereUniqueWithoutReportAInput[]
    createMany?: MatchEvidenceCreateManyReportAInputEnvelope
    set?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    disconnect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    delete?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    update?: MatchEvidenceUpdateWithWhereUniqueWithoutReportAInput | MatchEvidenceUpdateWithWhereUniqueWithoutReportAInput[]
    updateMany?: MatchEvidenceUpdateManyWithWhereWithoutReportAInput | MatchEvidenceUpdateManyWithWhereWithoutReportAInput[]
    deleteMany?: MatchEvidenceScalarWhereInput | MatchEvidenceScalarWhereInput[]
  }

  export type MatchEvidenceUpdateManyWithoutReportBNestedInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportBInput, MatchEvidenceUncheckedCreateWithoutReportBInput> | MatchEvidenceCreateWithoutReportBInput[] | MatchEvidenceUncheckedCreateWithoutReportBInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportBInput | MatchEvidenceCreateOrConnectWithoutReportBInput[]
    upsert?: MatchEvidenceUpsertWithWhereUniqueWithoutReportBInput | MatchEvidenceUpsertWithWhereUniqueWithoutReportBInput[]
    createMany?: MatchEvidenceCreateManyReportBInputEnvelope
    set?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    disconnect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    delete?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    update?: MatchEvidenceUpdateWithWhereUniqueWithoutReportBInput | MatchEvidenceUpdateWithWhereUniqueWithoutReportBInput[]
    updateMany?: MatchEvidenceUpdateManyWithWhereWithoutReportBInput | MatchEvidenceUpdateManyWithWhereWithoutReportBInput[]
    deleteMany?: MatchEvidenceScalarWhereInput | MatchEvidenceScalarWhereInput[]
  }

  export type TrendSnapshotUpdateManyWithoutReportNestedInput = {
    create?: XOR<TrendSnapshotCreateWithoutReportInput, TrendSnapshotUncheckedCreateWithoutReportInput> | TrendSnapshotCreateWithoutReportInput[] | TrendSnapshotUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TrendSnapshotCreateOrConnectWithoutReportInput | TrendSnapshotCreateOrConnectWithoutReportInput[]
    upsert?: TrendSnapshotUpsertWithWhereUniqueWithoutReportInput | TrendSnapshotUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: TrendSnapshotCreateManyReportInputEnvelope
    set?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    disconnect?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    delete?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    connect?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    update?: TrendSnapshotUpdateWithWhereUniqueWithoutReportInput | TrendSnapshotUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: TrendSnapshotUpdateManyWithWhereWithoutReportInput | TrendSnapshotUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: TrendSnapshotScalarWhereInput | TrendSnapshotScalarWhereInput[]
  }

  export type ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<ReportIndicatorCreateWithoutReportInput, ReportIndicatorUncheckedCreateWithoutReportInput> | ReportIndicatorCreateWithoutReportInput[] | ReportIndicatorUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutReportInput | ReportIndicatorCreateOrConnectWithoutReportInput[]
    upsert?: ReportIndicatorUpsertWithWhereUniqueWithoutReportInput | ReportIndicatorUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ReportIndicatorCreateManyReportInputEnvelope
    set?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    disconnect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    delete?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    update?: ReportIndicatorUpdateWithWhereUniqueWithoutReportInput | ReportIndicatorUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ReportIndicatorUpdateManyWithWhereWithoutReportInput | ReportIndicatorUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ReportIndicatorScalarWhereInput | ReportIndicatorScalarWhereInput[]
  }

  export type ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<ReviewDecisionCreateWithoutReportInput, ReviewDecisionUncheckedCreateWithoutReportInput> | ReviewDecisionCreateWithoutReportInput[] | ReviewDecisionUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ReviewDecisionCreateOrConnectWithoutReportInput | ReviewDecisionCreateOrConnectWithoutReportInput[]
    upsert?: ReviewDecisionUpsertWithWhereUniqueWithoutReportInput | ReviewDecisionUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ReviewDecisionCreateManyReportInputEnvelope
    set?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    disconnect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    delete?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    connect?: ReviewDecisionWhereUniqueInput | ReviewDecisionWhereUniqueInput[]
    update?: ReviewDecisionUpdateWithWhereUniqueWithoutReportInput | ReviewDecisionUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ReviewDecisionUpdateManyWithWhereWithoutReportInput | ReviewDecisionUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ReviewDecisionScalarWhereInput | ReviewDecisionScalarWhereInput[]
  }

  export type CaseNoteUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<CaseNoteCreateWithoutReportInput, CaseNoteUncheckedCreateWithoutReportInput> | CaseNoteCreateWithoutReportInput[] | CaseNoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: CaseNoteCreateOrConnectWithoutReportInput | CaseNoteCreateOrConnectWithoutReportInput[]
    upsert?: CaseNoteUpsertWithWhereUniqueWithoutReportInput | CaseNoteUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: CaseNoteCreateManyReportInputEnvelope
    set?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    disconnect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    delete?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    connect?: CaseNoteWhereUniqueInput | CaseNoteWhereUniqueInput[]
    update?: CaseNoteUpdateWithWhereUniqueWithoutReportInput | CaseNoteUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: CaseNoteUpdateManyWithWhereWithoutReportInput | CaseNoteUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: CaseNoteScalarWhereInput | CaseNoteScalarWhereInput[]
  }

  export type AuditEventUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<AuditEventCreateWithoutReportInput, AuditEventUncheckedCreateWithoutReportInput> | AuditEventCreateWithoutReportInput[] | AuditEventUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutReportInput | AuditEventCreateOrConnectWithoutReportInput[]
    upsert?: AuditEventUpsertWithWhereUniqueWithoutReportInput | AuditEventUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: AuditEventCreateManyReportInputEnvelope
    set?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    disconnect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    delete?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    update?: AuditEventUpdateWithWhereUniqueWithoutReportInput | AuditEventUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: AuditEventUpdateManyWithWhereWithoutReportInput | AuditEventUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
  }

  export type MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportAInput, MatchEvidenceUncheckedCreateWithoutReportAInput> | MatchEvidenceCreateWithoutReportAInput[] | MatchEvidenceUncheckedCreateWithoutReportAInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportAInput | MatchEvidenceCreateOrConnectWithoutReportAInput[]
    upsert?: MatchEvidenceUpsertWithWhereUniqueWithoutReportAInput | MatchEvidenceUpsertWithWhereUniqueWithoutReportAInput[]
    createMany?: MatchEvidenceCreateManyReportAInputEnvelope
    set?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    disconnect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    delete?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    update?: MatchEvidenceUpdateWithWhereUniqueWithoutReportAInput | MatchEvidenceUpdateWithWhereUniqueWithoutReportAInput[]
    updateMany?: MatchEvidenceUpdateManyWithWhereWithoutReportAInput | MatchEvidenceUpdateManyWithWhereWithoutReportAInput[]
    deleteMany?: MatchEvidenceScalarWhereInput | MatchEvidenceScalarWhereInput[]
  }

  export type MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput = {
    create?: XOR<MatchEvidenceCreateWithoutReportBInput, MatchEvidenceUncheckedCreateWithoutReportBInput> | MatchEvidenceCreateWithoutReportBInput[] | MatchEvidenceUncheckedCreateWithoutReportBInput[]
    connectOrCreate?: MatchEvidenceCreateOrConnectWithoutReportBInput | MatchEvidenceCreateOrConnectWithoutReportBInput[]
    upsert?: MatchEvidenceUpsertWithWhereUniqueWithoutReportBInput | MatchEvidenceUpsertWithWhereUniqueWithoutReportBInput[]
    createMany?: MatchEvidenceCreateManyReportBInputEnvelope
    set?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    disconnect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    delete?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    connect?: MatchEvidenceWhereUniqueInput | MatchEvidenceWhereUniqueInput[]
    update?: MatchEvidenceUpdateWithWhereUniqueWithoutReportBInput | MatchEvidenceUpdateWithWhereUniqueWithoutReportBInput[]
    updateMany?: MatchEvidenceUpdateManyWithWhereWithoutReportBInput | MatchEvidenceUpdateManyWithWhereWithoutReportBInput[]
    deleteMany?: MatchEvidenceScalarWhereInput | MatchEvidenceScalarWhereInput[]
  }

  export type TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<TrendSnapshotCreateWithoutReportInput, TrendSnapshotUncheckedCreateWithoutReportInput> | TrendSnapshotCreateWithoutReportInput[] | TrendSnapshotUncheckedCreateWithoutReportInput[]
    connectOrCreate?: TrendSnapshotCreateOrConnectWithoutReportInput | TrendSnapshotCreateOrConnectWithoutReportInput[]
    upsert?: TrendSnapshotUpsertWithWhereUniqueWithoutReportInput | TrendSnapshotUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: TrendSnapshotCreateManyReportInputEnvelope
    set?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    disconnect?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    delete?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    connect?: TrendSnapshotWhereUniqueInput | TrendSnapshotWhereUniqueInput[]
    update?: TrendSnapshotUpdateWithWhereUniqueWithoutReportInput | TrendSnapshotUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: TrendSnapshotUpdateManyWithWhereWithoutReportInput | TrendSnapshotUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: TrendSnapshotScalarWhereInput | TrendSnapshotScalarWhereInput[]
  }

  export type ReportIndicatorCreateNestedManyWithoutIndicatorInput = {
    create?: XOR<ReportIndicatorCreateWithoutIndicatorInput, ReportIndicatorUncheckedCreateWithoutIndicatorInput> | ReportIndicatorCreateWithoutIndicatorInput[] | ReportIndicatorUncheckedCreateWithoutIndicatorInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutIndicatorInput | ReportIndicatorCreateOrConnectWithoutIndicatorInput[]
    createMany?: ReportIndicatorCreateManyIndicatorInputEnvelope
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
  }

  export type ReportIndicatorUncheckedCreateNestedManyWithoutIndicatorInput = {
    create?: XOR<ReportIndicatorCreateWithoutIndicatorInput, ReportIndicatorUncheckedCreateWithoutIndicatorInput> | ReportIndicatorCreateWithoutIndicatorInput[] | ReportIndicatorUncheckedCreateWithoutIndicatorInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutIndicatorInput | ReportIndicatorCreateOrConnectWithoutIndicatorInput[]
    createMany?: ReportIndicatorCreateManyIndicatorInputEnvelope
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
  }

  export type EnumIndicatorTypeFieldUpdateOperationsInput = {
    set?: $Enums.IndicatorType
  }

  export type ReportIndicatorUpdateManyWithoutIndicatorNestedInput = {
    create?: XOR<ReportIndicatorCreateWithoutIndicatorInput, ReportIndicatorUncheckedCreateWithoutIndicatorInput> | ReportIndicatorCreateWithoutIndicatorInput[] | ReportIndicatorUncheckedCreateWithoutIndicatorInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutIndicatorInput | ReportIndicatorCreateOrConnectWithoutIndicatorInput[]
    upsert?: ReportIndicatorUpsertWithWhereUniqueWithoutIndicatorInput | ReportIndicatorUpsertWithWhereUniqueWithoutIndicatorInput[]
    createMany?: ReportIndicatorCreateManyIndicatorInputEnvelope
    set?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    disconnect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    delete?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    update?: ReportIndicatorUpdateWithWhereUniqueWithoutIndicatorInput | ReportIndicatorUpdateWithWhereUniqueWithoutIndicatorInput[]
    updateMany?: ReportIndicatorUpdateManyWithWhereWithoutIndicatorInput | ReportIndicatorUpdateManyWithWhereWithoutIndicatorInput[]
    deleteMany?: ReportIndicatorScalarWhereInput | ReportIndicatorScalarWhereInput[]
  }

  export type ReportIndicatorUncheckedUpdateManyWithoutIndicatorNestedInput = {
    create?: XOR<ReportIndicatorCreateWithoutIndicatorInput, ReportIndicatorUncheckedCreateWithoutIndicatorInput> | ReportIndicatorCreateWithoutIndicatorInput[] | ReportIndicatorUncheckedCreateWithoutIndicatorInput[]
    connectOrCreate?: ReportIndicatorCreateOrConnectWithoutIndicatorInput | ReportIndicatorCreateOrConnectWithoutIndicatorInput[]
    upsert?: ReportIndicatorUpsertWithWhereUniqueWithoutIndicatorInput | ReportIndicatorUpsertWithWhereUniqueWithoutIndicatorInput[]
    createMany?: ReportIndicatorCreateManyIndicatorInputEnvelope
    set?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    disconnect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    delete?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    connect?: ReportIndicatorWhereUniqueInput | ReportIndicatorWhereUniqueInput[]
    update?: ReportIndicatorUpdateWithWhereUniqueWithoutIndicatorInput | ReportIndicatorUpdateWithWhereUniqueWithoutIndicatorInput[]
    updateMany?: ReportIndicatorUpdateManyWithWhereWithoutIndicatorInput | ReportIndicatorUpdateManyWithWhereWithoutIndicatorInput[]
    deleteMany?: ReportIndicatorScalarWhereInput | ReportIndicatorScalarWhereInput[]
  }

  export type ReportCreateNestedOneWithoutIndicatorsInput = {
    create?: XOR<ReportCreateWithoutIndicatorsInput, ReportUncheckedCreateWithoutIndicatorsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutIndicatorsInput
    connect?: ReportWhereUniqueInput
  }

  export type IndicatorCreateNestedOneWithoutReportsInput = {
    create?: XOR<IndicatorCreateWithoutReportsInput, IndicatorUncheckedCreateWithoutReportsInput>
    connectOrCreate?: IndicatorCreateOrConnectWithoutReportsInput
    connect?: IndicatorWhereUniqueInput
  }

  export type ReportUpdateOneRequiredWithoutIndicatorsNestedInput = {
    create?: XOR<ReportCreateWithoutIndicatorsInput, ReportUncheckedCreateWithoutIndicatorsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutIndicatorsInput
    upsert?: ReportUpsertWithoutIndicatorsInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutIndicatorsInput, ReportUpdateWithoutIndicatorsInput>, ReportUncheckedUpdateWithoutIndicatorsInput>
  }

  export type IndicatorUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<IndicatorCreateWithoutReportsInput, IndicatorUncheckedCreateWithoutReportsInput>
    connectOrCreate?: IndicatorCreateOrConnectWithoutReportsInput
    upsert?: IndicatorUpsertWithoutReportsInput
    connect?: IndicatorWhereUniqueInput
    update?: XOR<XOR<IndicatorUpdateToOneWithWhereWithoutReportsInput, IndicatorUpdateWithoutReportsInput>, IndicatorUncheckedUpdateWithoutReportsInput>
  }

  export type ReportCreateNestedOneWithoutMatchesAsAInput = {
    create?: XOR<ReportCreateWithoutMatchesAsAInput, ReportUncheckedCreateWithoutMatchesAsAInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMatchesAsAInput
    connect?: ReportWhereUniqueInput
  }

  export type ReportCreateNestedOneWithoutMatchesAsBInput = {
    create?: XOR<ReportCreateWithoutMatchesAsBInput, ReportUncheckedCreateWithoutMatchesAsBInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMatchesAsBInput
    connect?: ReportWhereUniqueInput
  }

  export type ReportUpdateOneRequiredWithoutMatchesAsANestedInput = {
    create?: XOR<ReportCreateWithoutMatchesAsAInput, ReportUncheckedCreateWithoutMatchesAsAInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMatchesAsAInput
    upsert?: ReportUpsertWithoutMatchesAsAInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutMatchesAsAInput, ReportUpdateWithoutMatchesAsAInput>, ReportUncheckedUpdateWithoutMatchesAsAInput>
  }

  export type ReportUpdateOneRequiredWithoutMatchesAsBNestedInput = {
    create?: XOR<ReportCreateWithoutMatchesAsBInput, ReportUncheckedCreateWithoutMatchesAsBInput>
    connectOrCreate?: ReportCreateOrConnectWithoutMatchesAsBInput
    upsert?: ReportUpsertWithoutMatchesAsBInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutMatchesAsBInput, ReportUpdateWithoutMatchesAsBInput>, ReportUncheckedUpdateWithoutMatchesAsBInput>
  }

  export type ReportCreateNestedOneWithoutReviewDecisionsInput = {
    create?: XOR<ReportCreateWithoutReviewDecisionsInput, ReportUncheckedCreateWithoutReviewDecisionsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutReviewDecisionsInput
    connect?: ReportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewDecisionsInput = {
    create?: XOR<UserCreateWithoutReviewDecisionsInput, UserUncheckedCreateWithoutReviewDecisionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewDecisionsInput
    connect?: UserWhereUniqueInput
  }

  export type ReportUpdateOneRequiredWithoutReviewDecisionsNestedInput = {
    create?: XOR<ReportCreateWithoutReviewDecisionsInput, ReportUncheckedCreateWithoutReviewDecisionsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutReviewDecisionsInput
    upsert?: ReportUpsertWithoutReviewDecisionsInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutReviewDecisionsInput, ReportUpdateWithoutReviewDecisionsInput>, ReportUncheckedUpdateWithoutReviewDecisionsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewDecisionsNestedInput = {
    create?: XOR<UserCreateWithoutReviewDecisionsInput, UserUncheckedCreateWithoutReviewDecisionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewDecisionsInput
    upsert?: UserUpsertWithoutReviewDecisionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewDecisionsInput, UserUpdateWithoutReviewDecisionsInput>, UserUncheckedUpdateWithoutReviewDecisionsInput>
  }

  export type ReportCreateNestedOneWithoutCaseNotesInput = {
    create?: XOR<ReportCreateWithoutCaseNotesInput, ReportUncheckedCreateWithoutCaseNotesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutCaseNotesInput
    connect?: ReportWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCaseNotesInput = {
    create?: XOR<UserCreateWithoutCaseNotesInput, UserUncheckedCreateWithoutCaseNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCaseNotesInput
    connect?: UserWhereUniqueInput
  }

  export type ReportUpdateOneRequiredWithoutCaseNotesNestedInput = {
    create?: XOR<ReportCreateWithoutCaseNotesInput, ReportUncheckedCreateWithoutCaseNotesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutCaseNotesInput
    upsert?: ReportUpsertWithoutCaseNotesInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutCaseNotesInput, ReportUpdateWithoutCaseNotesInput>, ReportUncheckedUpdateWithoutCaseNotesInput>
  }

  export type UserUpdateOneRequiredWithoutCaseNotesNestedInput = {
    create?: XOR<UserCreateWithoutCaseNotesInput, UserUncheckedCreateWithoutCaseNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCaseNotesInput
    upsert?: UserUpsertWithoutCaseNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCaseNotesInput, UserUpdateWithoutCaseNotesInput>, UserUncheckedUpdateWithoutCaseNotesInput>
  }

  export type UserCreateNestedOneWithoutAuditEventsInput = {
    create?: XOR<UserCreateWithoutAuditEventsInput, UserUncheckedCreateWithoutAuditEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditEventsInput
    connect?: UserWhereUniqueInput
  }

  export type ReportCreateNestedOneWithoutAuditEventsInput = {
    create?: XOR<ReportCreateWithoutAuditEventsInput, ReportUncheckedCreateWithoutAuditEventsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutAuditEventsInput
    connect?: ReportWhereUniqueInput
  }

  export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction
  }

  export type UserUpdateOneWithoutAuditEventsNestedInput = {
    create?: XOR<UserCreateWithoutAuditEventsInput, UserUncheckedCreateWithoutAuditEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditEventsInput
    upsert?: UserUpsertWithoutAuditEventsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditEventsInput, UserUpdateWithoutAuditEventsInput>, UserUncheckedUpdateWithoutAuditEventsInput>
  }

  export type ReportUpdateOneWithoutAuditEventsNestedInput = {
    create?: XOR<ReportCreateWithoutAuditEventsInput, ReportUncheckedCreateWithoutAuditEventsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutAuditEventsInput
    upsert?: ReportUpsertWithoutAuditEventsInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutAuditEventsInput, ReportUpdateWithoutAuditEventsInput>, ReportUncheckedUpdateWithoutAuditEventsInput>
  }

  export type ReportCreateNestedOneWithoutTrendSnapshotsInput = {
    create?: XOR<ReportCreateWithoutTrendSnapshotsInput, ReportUncheckedCreateWithoutTrendSnapshotsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutTrendSnapshotsInput
    connect?: ReportWhereUniqueInput
  }

  export type NullableEnumRiskLevelFieldUpdateOperationsInput = {
    set?: $Enums.RiskLevel | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ReportUpdateOneWithoutTrendSnapshotsNestedInput = {
    create?: XOR<ReportCreateWithoutTrendSnapshotsInput, ReportUncheckedCreateWithoutTrendSnapshotsInput>
    connectOrCreate?: ReportCreateOrConnectWithoutTrendSnapshotsInput
    upsert?: ReportUpsertWithoutTrendSnapshotsInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutTrendSnapshotsInput, ReportUpdateWithoutTrendSnapshotsInput>, ReportUncheckedUpdateWithoutTrendSnapshotsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRiskLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelFilter<$PrismaModel> | $Enums.RiskLevel
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedEnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type NestedEnumIndicatorTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.IndicatorType | EnumIndicatorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndicatorTypeFilter<$PrismaModel> | $Enums.IndicatorType
  }

  export type NestedEnumIndicatorTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IndicatorType | EnumIndicatorTypeFieldRefInput<$PrismaModel>
    in?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.IndicatorType[] | ListEnumIndicatorTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumIndicatorTypeWithAggregatesFilter<$PrismaModel> | $Enums.IndicatorType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIndicatorTypeFilter<$PrismaModel>
    _max?: NestedEnumIndicatorTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type NestedEnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }

  export type NestedEnumRiskLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskLevelNullableFilter<$PrismaModel> | $Enums.RiskLevel | null
  }

  export type NestedEnumRiskLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRiskLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ReportCreateWithoutSubmittedByInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutSubmittedByInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutSubmittedByInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutSubmittedByInput, ReportUncheckedCreateWithoutSubmittedByInput>
  }

  export type ReportCreateManySubmittedByInputEnvelope = {
    data: ReportCreateManySubmittedByInput | ReportCreateManySubmittedByInput[]
    skipDuplicates?: boolean
  }

  export type ReviewDecisionCreateWithoutReviewerInput = {
    id?: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    report: ReportCreateNestedOneWithoutReviewDecisionsInput
  }

  export type ReviewDecisionUncheckedCreateWithoutReviewerInput = {
    id?: string
    reportId: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReviewDecisionCreateOrConnectWithoutReviewerInput = {
    where: ReviewDecisionWhereUniqueInput
    create: XOR<ReviewDecisionCreateWithoutReviewerInput, ReviewDecisionUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewDecisionCreateManyReviewerInputEnvelope = {
    data: ReviewDecisionCreateManyReviewerInput | ReviewDecisionCreateManyReviewerInput[]
    skipDuplicates?: boolean
  }

  export type CaseNoteCreateWithoutAuthorInput = {
    id?: string
    content: string
    createdAt?: Date | string
    report: ReportCreateNestedOneWithoutCaseNotesInput
  }

  export type CaseNoteUncheckedCreateWithoutAuthorInput = {
    id?: string
    reportId: string
    content: string
    createdAt?: Date | string
  }

  export type CaseNoteCreateOrConnectWithoutAuthorInput = {
    where: CaseNoteWhereUniqueInput
    create: XOR<CaseNoteCreateWithoutAuthorInput, CaseNoteUncheckedCreateWithoutAuthorInput>
  }

  export type CaseNoteCreateManyAuthorInputEnvelope = {
    data: CaseNoteCreateManyAuthorInput | CaseNoteCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type AuditEventCreateWithoutUserInput = {
    id?: string
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    report?: ReportCreateNestedOneWithoutAuditEventsInput
  }

  export type AuditEventUncheckedCreateWithoutUserInput = {
    id?: string
    reportId?: string | null
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditEventCreateOrConnectWithoutUserInput = {
    where: AuditEventWhereUniqueInput
    create: XOR<AuditEventCreateWithoutUserInput, AuditEventUncheckedCreateWithoutUserInput>
  }

  export type AuditEventCreateManyUserInputEnvelope = {
    data: AuditEventCreateManyUserInput | AuditEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReportUpsertWithWhereUniqueWithoutSubmittedByInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutSubmittedByInput, ReportUncheckedUpdateWithoutSubmittedByInput>
    create: XOR<ReportCreateWithoutSubmittedByInput, ReportUncheckedCreateWithoutSubmittedByInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutSubmittedByInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutSubmittedByInput, ReportUncheckedUpdateWithoutSubmittedByInput>
  }

  export type ReportUpdateManyWithWhereWithoutSubmittedByInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutSubmittedByInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    submittedById?: StringNullableFilter<"Report"> | string | null
    contentType?: StringFilter<"Report"> | string
    rawContent?: StringFilter<"Report"> | string
    publicSummary?: StringNullableFilter<"Report"> | string | null
    platform?: StringNullableFilter<"Report"> | string | null
    targetRegion?: StringNullableFilter<"Report"> | string | null
    riskLevel?: EnumRiskLevelFilter<"Report"> | $Enums.RiskLevel
    riskScore?: FloatFilter<"Report"> | number
    evidenceJson?: JsonNullableFilter<"Report">
    storyModeJson?: JsonNullableFilter<"Report">
    nextStepsJson?: JsonNullableFilter<"Report">
    caveat?: StringNullableFilter<"Report"> | string | null
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFilter<"Report"> | $Enums.SourceType
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type ReviewDecisionUpsertWithWhereUniqueWithoutReviewerInput = {
    where: ReviewDecisionWhereUniqueInput
    update: XOR<ReviewDecisionUpdateWithoutReviewerInput, ReviewDecisionUncheckedUpdateWithoutReviewerInput>
    create: XOR<ReviewDecisionCreateWithoutReviewerInput, ReviewDecisionUncheckedCreateWithoutReviewerInput>
  }

  export type ReviewDecisionUpdateWithWhereUniqueWithoutReviewerInput = {
    where: ReviewDecisionWhereUniqueInput
    data: XOR<ReviewDecisionUpdateWithoutReviewerInput, ReviewDecisionUncheckedUpdateWithoutReviewerInput>
  }

  export type ReviewDecisionUpdateManyWithWhereWithoutReviewerInput = {
    where: ReviewDecisionScalarWhereInput
    data: XOR<ReviewDecisionUpdateManyMutationInput, ReviewDecisionUncheckedUpdateManyWithoutReviewerInput>
  }

  export type ReviewDecisionScalarWhereInput = {
    AND?: ReviewDecisionScalarWhereInput | ReviewDecisionScalarWhereInput[]
    OR?: ReviewDecisionScalarWhereInput[]
    NOT?: ReviewDecisionScalarWhereInput | ReviewDecisionScalarWhereInput[]
    id?: StringFilter<"ReviewDecision"> | string
    reportId?: StringFilter<"ReviewDecision"> | string
    reviewerId?: StringFilter<"ReviewDecision"> | string
    status?: EnumReportStatusFilter<"ReviewDecision"> | $Enums.ReportStatus
    rationale?: StringFilter<"ReviewDecision"> | string
    redactions?: JsonNullableFilter<"ReviewDecision">
    createdAt?: DateTimeFilter<"ReviewDecision"> | Date | string
  }

  export type CaseNoteUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CaseNoteWhereUniqueInput
    update: XOR<CaseNoteUpdateWithoutAuthorInput, CaseNoteUncheckedUpdateWithoutAuthorInput>
    create: XOR<CaseNoteCreateWithoutAuthorInput, CaseNoteUncheckedCreateWithoutAuthorInput>
  }

  export type CaseNoteUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CaseNoteWhereUniqueInput
    data: XOR<CaseNoteUpdateWithoutAuthorInput, CaseNoteUncheckedUpdateWithoutAuthorInput>
  }

  export type CaseNoteUpdateManyWithWhereWithoutAuthorInput = {
    where: CaseNoteScalarWhereInput
    data: XOR<CaseNoteUpdateManyMutationInput, CaseNoteUncheckedUpdateManyWithoutAuthorInput>
  }

  export type CaseNoteScalarWhereInput = {
    AND?: CaseNoteScalarWhereInput | CaseNoteScalarWhereInput[]
    OR?: CaseNoteScalarWhereInput[]
    NOT?: CaseNoteScalarWhereInput | CaseNoteScalarWhereInput[]
    id?: StringFilter<"CaseNote"> | string
    reportId?: StringFilter<"CaseNote"> | string
    authorId?: StringFilter<"CaseNote"> | string
    content?: StringFilter<"CaseNote"> | string
    createdAt?: DateTimeFilter<"CaseNote"> | Date | string
  }

  export type AuditEventUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditEventWhereUniqueInput
    update: XOR<AuditEventUpdateWithoutUserInput, AuditEventUncheckedUpdateWithoutUserInput>
    create: XOR<AuditEventCreateWithoutUserInput, AuditEventUncheckedCreateWithoutUserInput>
  }

  export type AuditEventUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditEventWhereUniqueInput
    data: XOR<AuditEventUpdateWithoutUserInput, AuditEventUncheckedUpdateWithoutUserInput>
  }

  export type AuditEventUpdateManyWithWhereWithoutUserInput = {
    where: AuditEventScalarWhereInput
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditEventScalarWhereInput = {
    AND?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
    OR?: AuditEventScalarWhereInput[]
    NOT?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
    id?: StringFilter<"AuditEvent"> | string
    userId?: StringNullableFilter<"AuditEvent"> | string | null
    reportId?: StringNullableFilter<"AuditEvent"> | string | null
    action?: EnumAuditActionFilter<"AuditEvent"> | $Enums.AuditAction
    detail?: JsonNullableFilter<"AuditEvent">
    createdAt?: DateTimeFilter<"AuditEvent"> | Date | string
  }

  export type UserCreateWithoutReportsInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReviewerInput
    caseNotes?: CaseNoteCreateNestedManyWithoutAuthorInput
    auditEvents?: AuditEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportsInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReviewerInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutAuthorInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type ReportIndicatorCreateWithoutReportInput = {
    id?: string
    context?: string | null
    indicator: IndicatorCreateNestedOneWithoutReportsInput
  }

  export type ReportIndicatorUncheckedCreateWithoutReportInput = {
    id?: string
    indicatorId: string
    context?: string | null
  }

  export type ReportIndicatorCreateOrConnectWithoutReportInput = {
    where: ReportIndicatorWhereUniqueInput
    create: XOR<ReportIndicatorCreateWithoutReportInput, ReportIndicatorUncheckedCreateWithoutReportInput>
  }

  export type ReportIndicatorCreateManyReportInputEnvelope = {
    data: ReportIndicatorCreateManyReportInput | ReportIndicatorCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type ReviewDecisionCreateWithoutReportInput = {
    id?: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reviewer: UserCreateNestedOneWithoutReviewDecisionsInput
  }

  export type ReviewDecisionUncheckedCreateWithoutReportInput = {
    id?: string
    reviewerId: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReviewDecisionCreateOrConnectWithoutReportInput = {
    where: ReviewDecisionWhereUniqueInput
    create: XOR<ReviewDecisionCreateWithoutReportInput, ReviewDecisionUncheckedCreateWithoutReportInput>
  }

  export type ReviewDecisionCreateManyReportInputEnvelope = {
    data: ReviewDecisionCreateManyReportInput | ReviewDecisionCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type CaseNoteCreateWithoutReportInput = {
    id?: string
    content: string
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutCaseNotesInput
  }

  export type CaseNoteUncheckedCreateWithoutReportInput = {
    id?: string
    authorId: string
    content: string
    createdAt?: Date | string
  }

  export type CaseNoteCreateOrConnectWithoutReportInput = {
    where: CaseNoteWhereUniqueInput
    create: XOR<CaseNoteCreateWithoutReportInput, CaseNoteUncheckedCreateWithoutReportInput>
  }

  export type CaseNoteCreateManyReportInputEnvelope = {
    data: CaseNoteCreateManyReportInput | CaseNoteCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type AuditEventCreateWithoutReportInput = {
    id?: string
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditEventsInput
  }

  export type AuditEventUncheckedCreateWithoutReportInput = {
    id?: string
    userId?: string | null
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditEventCreateOrConnectWithoutReportInput = {
    where: AuditEventWhereUniqueInput
    create: XOR<AuditEventCreateWithoutReportInput, AuditEventUncheckedCreateWithoutReportInput>
  }

  export type AuditEventCreateManyReportInputEnvelope = {
    data: AuditEventCreateManyReportInput | AuditEventCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type MatchEvidenceCreateWithoutReportAInput = {
    id?: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reportB: ReportCreateNestedOneWithoutMatchesAsBInput
  }

  export type MatchEvidenceUncheckedCreateWithoutReportAInput = {
    id?: string
    reportBId: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MatchEvidenceCreateOrConnectWithoutReportAInput = {
    where: MatchEvidenceWhereUniqueInput
    create: XOR<MatchEvidenceCreateWithoutReportAInput, MatchEvidenceUncheckedCreateWithoutReportAInput>
  }

  export type MatchEvidenceCreateManyReportAInputEnvelope = {
    data: MatchEvidenceCreateManyReportAInput | MatchEvidenceCreateManyReportAInput[]
    skipDuplicates?: boolean
  }

  export type MatchEvidenceCreateWithoutReportBInput = {
    id?: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reportA: ReportCreateNestedOneWithoutMatchesAsAInput
  }

  export type MatchEvidenceUncheckedCreateWithoutReportBInput = {
    id?: string
    reportAId: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MatchEvidenceCreateOrConnectWithoutReportBInput = {
    where: MatchEvidenceWhereUniqueInput
    create: XOR<MatchEvidenceCreateWithoutReportBInput, MatchEvidenceUncheckedCreateWithoutReportBInput>
  }

  export type MatchEvidenceCreateManyReportBInputEnvelope = {
    data: MatchEvidenceCreateManyReportBInput | MatchEvidenceCreateManyReportBInput[]
    skipDuplicates?: boolean
  }

  export type TrendSnapshotCreateWithoutReportInput = {
    id?: string
    date: Date | string
    contentType?: string | null
    riskLevel?: $Enums.RiskLevel | null
    tactic?: string | null
    reportCount?: number
    sampleReport?: string | null
    createdAt?: Date | string
  }

  export type TrendSnapshotUncheckedCreateWithoutReportInput = {
    id?: string
    date: Date | string
    contentType?: string | null
    riskLevel?: $Enums.RiskLevel | null
    tactic?: string | null
    reportCount?: number
    sampleReport?: string | null
    createdAt?: Date | string
  }

  export type TrendSnapshotCreateOrConnectWithoutReportInput = {
    where: TrendSnapshotWhereUniqueInput
    create: XOR<TrendSnapshotCreateWithoutReportInput, TrendSnapshotUncheckedCreateWithoutReportInput>
  }

  export type TrendSnapshotCreateManyReportInputEnvelope = {
    data: TrendSnapshotCreateManyReportInput | TrendSnapshotCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReportsInput = {
    update: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReviewerNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutAuthorNestedInput
    auditEvents?: AuditEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReviewerNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutAuthorNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReportIndicatorUpsertWithWhereUniqueWithoutReportInput = {
    where: ReportIndicatorWhereUniqueInput
    update: XOR<ReportIndicatorUpdateWithoutReportInput, ReportIndicatorUncheckedUpdateWithoutReportInput>
    create: XOR<ReportIndicatorCreateWithoutReportInput, ReportIndicatorUncheckedCreateWithoutReportInput>
  }

  export type ReportIndicatorUpdateWithWhereUniqueWithoutReportInput = {
    where: ReportIndicatorWhereUniqueInput
    data: XOR<ReportIndicatorUpdateWithoutReportInput, ReportIndicatorUncheckedUpdateWithoutReportInput>
  }

  export type ReportIndicatorUpdateManyWithWhereWithoutReportInput = {
    where: ReportIndicatorScalarWhereInput
    data: XOR<ReportIndicatorUpdateManyMutationInput, ReportIndicatorUncheckedUpdateManyWithoutReportInput>
  }

  export type ReportIndicatorScalarWhereInput = {
    AND?: ReportIndicatorScalarWhereInput | ReportIndicatorScalarWhereInput[]
    OR?: ReportIndicatorScalarWhereInput[]
    NOT?: ReportIndicatorScalarWhereInput | ReportIndicatorScalarWhereInput[]
    id?: StringFilter<"ReportIndicator"> | string
    reportId?: StringFilter<"ReportIndicator"> | string
    indicatorId?: StringFilter<"ReportIndicator"> | string
    context?: StringNullableFilter<"ReportIndicator"> | string | null
  }

  export type ReviewDecisionUpsertWithWhereUniqueWithoutReportInput = {
    where: ReviewDecisionWhereUniqueInput
    update: XOR<ReviewDecisionUpdateWithoutReportInput, ReviewDecisionUncheckedUpdateWithoutReportInput>
    create: XOR<ReviewDecisionCreateWithoutReportInput, ReviewDecisionUncheckedCreateWithoutReportInput>
  }

  export type ReviewDecisionUpdateWithWhereUniqueWithoutReportInput = {
    where: ReviewDecisionWhereUniqueInput
    data: XOR<ReviewDecisionUpdateWithoutReportInput, ReviewDecisionUncheckedUpdateWithoutReportInput>
  }

  export type ReviewDecisionUpdateManyWithWhereWithoutReportInput = {
    where: ReviewDecisionScalarWhereInput
    data: XOR<ReviewDecisionUpdateManyMutationInput, ReviewDecisionUncheckedUpdateManyWithoutReportInput>
  }

  export type CaseNoteUpsertWithWhereUniqueWithoutReportInput = {
    where: CaseNoteWhereUniqueInput
    update: XOR<CaseNoteUpdateWithoutReportInput, CaseNoteUncheckedUpdateWithoutReportInput>
    create: XOR<CaseNoteCreateWithoutReportInput, CaseNoteUncheckedCreateWithoutReportInput>
  }

  export type CaseNoteUpdateWithWhereUniqueWithoutReportInput = {
    where: CaseNoteWhereUniqueInput
    data: XOR<CaseNoteUpdateWithoutReportInput, CaseNoteUncheckedUpdateWithoutReportInput>
  }

  export type CaseNoteUpdateManyWithWhereWithoutReportInput = {
    where: CaseNoteScalarWhereInput
    data: XOR<CaseNoteUpdateManyMutationInput, CaseNoteUncheckedUpdateManyWithoutReportInput>
  }

  export type AuditEventUpsertWithWhereUniqueWithoutReportInput = {
    where: AuditEventWhereUniqueInput
    update: XOR<AuditEventUpdateWithoutReportInput, AuditEventUncheckedUpdateWithoutReportInput>
    create: XOR<AuditEventCreateWithoutReportInput, AuditEventUncheckedCreateWithoutReportInput>
  }

  export type AuditEventUpdateWithWhereUniqueWithoutReportInput = {
    where: AuditEventWhereUniqueInput
    data: XOR<AuditEventUpdateWithoutReportInput, AuditEventUncheckedUpdateWithoutReportInput>
  }

  export type AuditEventUpdateManyWithWhereWithoutReportInput = {
    where: AuditEventScalarWhereInput
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyWithoutReportInput>
  }

  export type MatchEvidenceUpsertWithWhereUniqueWithoutReportAInput = {
    where: MatchEvidenceWhereUniqueInput
    update: XOR<MatchEvidenceUpdateWithoutReportAInput, MatchEvidenceUncheckedUpdateWithoutReportAInput>
    create: XOR<MatchEvidenceCreateWithoutReportAInput, MatchEvidenceUncheckedCreateWithoutReportAInput>
  }

  export type MatchEvidenceUpdateWithWhereUniqueWithoutReportAInput = {
    where: MatchEvidenceWhereUniqueInput
    data: XOR<MatchEvidenceUpdateWithoutReportAInput, MatchEvidenceUncheckedUpdateWithoutReportAInput>
  }

  export type MatchEvidenceUpdateManyWithWhereWithoutReportAInput = {
    where: MatchEvidenceScalarWhereInput
    data: XOR<MatchEvidenceUpdateManyMutationInput, MatchEvidenceUncheckedUpdateManyWithoutReportAInput>
  }

  export type MatchEvidenceScalarWhereInput = {
    AND?: MatchEvidenceScalarWhereInput | MatchEvidenceScalarWhereInput[]
    OR?: MatchEvidenceScalarWhereInput[]
    NOT?: MatchEvidenceScalarWhereInput | MatchEvidenceScalarWhereInput[]
    id?: StringFilter<"MatchEvidence"> | string
    reportAId?: StringFilter<"MatchEvidence"> | string
    reportBId?: StringFilter<"MatchEvidence"> | string
    similarityScore?: FloatFilter<"MatchEvidence"> | number
    matchedClues?: JsonFilter<"MatchEvidence">
    differences?: JsonFilter<"MatchEvidence">
    createdAt?: DateTimeFilter<"MatchEvidence"> | Date | string
  }

  export type MatchEvidenceUpsertWithWhereUniqueWithoutReportBInput = {
    where: MatchEvidenceWhereUniqueInput
    update: XOR<MatchEvidenceUpdateWithoutReportBInput, MatchEvidenceUncheckedUpdateWithoutReportBInput>
    create: XOR<MatchEvidenceCreateWithoutReportBInput, MatchEvidenceUncheckedCreateWithoutReportBInput>
  }

  export type MatchEvidenceUpdateWithWhereUniqueWithoutReportBInput = {
    where: MatchEvidenceWhereUniqueInput
    data: XOR<MatchEvidenceUpdateWithoutReportBInput, MatchEvidenceUncheckedUpdateWithoutReportBInput>
  }

  export type MatchEvidenceUpdateManyWithWhereWithoutReportBInput = {
    where: MatchEvidenceScalarWhereInput
    data: XOR<MatchEvidenceUpdateManyMutationInput, MatchEvidenceUncheckedUpdateManyWithoutReportBInput>
  }

  export type TrendSnapshotUpsertWithWhereUniqueWithoutReportInput = {
    where: TrendSnapshotWhereUniqueInput
    update: XOR<TrendSnapshotUpdateWithoutReportInput, TrendSnapshotUncheckedUpdateWithoutReportInput>
    create: XOR<TrendSnapshotCreateWithoutReportInput, TrendSnapshotUncheckedCreateWithoutReportInput>
  }

  export type TrendSnapshotUpdateWithWhereUniqueWithoutReportInput = {
    where: TrendSnapshotWhereUniqueInput
    data: XOR<TrendSnapshotUpdateWithoutReportInput, TrendSnapshotUncheckedUpdateWithoutReportInput>
  }

  export type TrendSnapshotUpdateManyWithWhereWithoutReportInput = {
    where: TrendSnapshotScalarWhereInput
    data: XOR<TrendSnapshotUpdateManyMutationInput, TrendSnapshotUncheckedUpdateManyWithoutReportInput>
  }

  export type TrendSnapshotScalarWhereInput = {
    AND?: TrendSnapshotScalarWhereInput | TrendSnapshotScalarWhereInput[]
    OR?: TrendSnapshotScalarWhereInput[]
    NOT?: TrendSnapshotScalarWhereInput | TrendSnapshotScalarWhereInput[]
    id?: StringFilter<"TrendSnapshot"> | string
    date?: DateTimeFilter<"TrendSnapshot"> | Date | string
    contentType?: StringNullableFilter<"TrendSnapshot"> | string | null
    riskLevel?: EnumRiskLevelNullableFilter<"TrendSnapshot"> | $Enums.RiskLevel | null
    tactic?: StringNullableFilter<"TrendSnapshot"> | string | null
    reportCount?: IntFilter<"TrendSnapshot"> | number
    sampleReport?: StringNullableFilter<"TrendSnapshot"> | string | null
    reportId?: StringNullableFilter<"TrendSnapshot"> | string | null
    createdAt?: DateTimeFilter<"TrendSnapshot"> | Date | string
  }

  export type ReportIndicatorCreateWithoutIndicatorInput = {
    id?: string
    context?: string | null
    report: ReportCreateNestedOneWithoutIndicatorsInput
  }

  export type ReportIndicatorUncheckedCreateWithoutIndicatorInput = {
    id?: string
    reportId: string
    context?: string | null
  }

  export type ReportIndicatorCreateOrConnectWithoutIndicatorInput = {
    where: ReportIndicatorWhereUniqueInput
    create: XOR<ReportIndicatorCreateWithoutIndicatorInput, ReportIndicatorUncheckedCreateWithoutIndicatorInput>
  }

  export type ReportIndicatorCreateManyIndicatorInputEnvelope = {
    data: ReportIndicatorCreateManyIndicatorInput | ReportIndicatorCreateManyIndicatorInput[]
    skipDuplicates?: boolean
  }

  export type ReportIndicatorUpsertWithWhereUniqueWithoutIndicatorInput = {
    where: ReportIndicatorWhereUniqueInput
    update: XOR<ReportIndicatorUpdateWithoutIndicatorInput, ReportIndicatorUncheckedUpdateWithoutIndicatorInput>
    create: XOR<ReportIndicatorCreateWithoutIndicatorInput, ReportIndicatorUncheckedCreateWithoutIndicatorInput>
  }

  export type ReportIndicatorUpdateWithWhereUniqueWithoutIndicatorInput = {
    where: ReportIndicatorWhereUniqueInput
    data: XOR<ReportIndicatorUpdateWithoutIndicatorInput, ReportIndicatorUncheckedUpdateWithoutIndicatorInput>
  }

  export type ReportIndicatorUpdateManyWithWhereWithoutIndicatorInput = {
    where: ReportIndicatorScalarWhereInput
    data: XOR<ReportIndicatorUpdateManyMutationInput, ReportIndicatorUncheckedUpdateManyWithoutIndicatorInput>
  }

  export type ReportCreateWithoutIndicatorsInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutIndicatorsInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutIndicatorsInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutIndicatorsInput, ReportUncheckedCreateWithoutIndicatorsInput>
  }

  export type IndicatorCreateWithoutReportsInput = {
    id?: string
    type: $Enums.IndicatorType
    value: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IndicatorUncheckedCreateWithoutReportsInput = {
    id?: string
    type: $Enums.IndicatorType
    value: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type IndicatorCreateOrConnectWithoutReportsInput = {
    where: IndicatorWhereUniqueInput
    create: XOR<IndicatorCreateWithoutReportsInput, IndicatorUncheckedCreateWithoutReportsInput>
  }

  export type ReportUpsertWithoutIndicatorsInput = {
    update: XOR<ReportUpdateWithoutIndicatorsInput, ReportUncheckedUpdateWithoutIndicatorsInput>
    create: XOR<ReportCreateWithoutIndicatorsInput, ReportUncheckedCreateWithoutIndicatorsInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutIndicatorsInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutIndicatorsInput, ReportUncheckedUpdateWithoutIndicatorsInput>
  }

  export type ReportUpdateWithoutIndicatorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutIndicatorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type IndicatorUpsertWithoutReportsInput = {
    update: XOR<IndicatorUpdateWithoutReportsInput, IndicatorUncheckedUpdateWithoutReportsInput>
    create: XOR<IndicatorCreateWithoutReportsInput, IndicatorUncheckedCreateWithoutReportsInput>
    where?: IndicatorWhereInput
  }

  export type IndicatorUpdateToOneWithWhereWithoutReportsInput = {
    where?: IndicatorWhereInput
    data: XOR<IndicatorUpdateWithoutReportsInput, IndicatorUncheckedUpdateWithoutReportsInput>
  }

  export type IndicatorUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumIndicatorTypeFieldUpdateOperationsInput | $Enums.IndicatorType
    value?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndicatorUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumIndicatorTypeFieldUpdateOperationsInput | $Enums.IndicatorType
    value?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateWithoutMatchesAsAInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutMatchesAsAInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutMatchesAsAInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutMatchesAsAInput, ReportUncheckedCreateWithoutMatchesAsAInput>
  }

  export type ReportCreateWithoutMatchesAsBInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutMatchesAsBInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutMatchesAsBInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutMatchesAsBInput, ReportUncheckedCreateWithoutMatchesAsBInput>
  }

  export type ReportUpsertWithoutMatchesAsAInput = {
    update: XOR<ReportUpdateWithoutMatchesAsAInput, ReportUncheckedUpdateWithoutMatchesAsAInput>
    create: XOR<ReportCreateWithoutMatchesAsAInput, ReportUncheckedCreateWithoutMatchesAsAInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutMatchesAsAInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutMatchesAsAInput, ReportUncheckedUpdateWithoutMatchesAsAInput>
  }

  export type ReportUpdateWithoutMatchesAsAInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutMatchesAsAInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUpsertWithoutMatchesAsBInput = {
    update: XOR<ReportUpdateWithoutMatchesAsBInput, ReportUncheckedUpdateWithoutMatchesAsBInput>
    create: XOR<ReportCreateWithoutMatchesAsBInput, ReportUncheckedCreateWithoutMatchesAsBInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutMatchesAsBInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutMatchesAsBInput, ReportUncheckedUpdateWithoutMatchesAsBInput>
  }

  export type ReportUpdateWithoutMatchesAsBInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutMatchesAsBInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateWithoutReviewDecisionsInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutReviewDecisionsInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutReviewDecisionsInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutReviewDecisionsInput, ReportUncheckedCreateWithoutReviewDecisionsInput>
  }

  export type UserCreateWithoutReviewDecisionsInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutSubmittedByInput
    caseNotes?: CaseNoteCreateNestedManyWithoutAuthorInput
    auditEvents?: AuditEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewDecisionsInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutSubmittedByInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutAuthorInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewDecisionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewDecisionsInput, UserUncheckedCreateWithoutReviewDecisionsInput>
  }

  export type ReportUpsertWithoutReviewDecisionsInput = {
    update: XOR<ReportUpdateWithoutReviewDecisionsInput, ReportUncheckedUpdateWithoutReviewDecisionsInput>
    create: XOR<ReportCreateWithoutReviewDecisionsInput, ReportUncheckedCreateWithoutReviewDecisionsInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutReviewDecisionsInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutReviewDecisionsInput, ReportUncheckedUpdateWithoutReviewDecisionsInput>
  }

  export type ReportUpdateWithoutReviewDecisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutReviewDecisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type UserUpsertWithoutReviewDecisionsInput = {
    update: XOR<UserUpdateWithoutReviewDecisionsInput, UserUncheckedUpdateWithoutReviewDecisionsInput>
    create: XOR<UserCreateWithoutReviewDecisionsInput, UserUncheckedCreateWithoutReviewDecisionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewDecisionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewDecisionsInput, UserUncheckedUpdateWithoutReviewDecisionsInput>
  }

  export type UserUpdateWithoutReviewDecisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutSubmittedByNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutAuthorNestedInput
    auditEvents?: AuditEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewDecisionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutSubmittedByNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutAuthorNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReportCreateWithoutCaseNotesInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutCaseNotesInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutCaseNotesInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutCaseNotesInput, ReportUncheckedCreateWithoutCaseNotesInput>
  }

  export type UserCreateWithoutCaseNotesInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutSubmittedByInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReviewerInput
    auditEvents?: AuditEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCaseNotesInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutSubmittedByInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReviewerInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCaseNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCaseNotesInput, UserUncheckedCreateWithoutCaseNotesInput>
  }

  export type ReportUpsertWithoutCaseNotesInput = {
    update: XOR<ReportUpdateWithoutCaseNotesInput, ReportUncheckedUpdateWithoutCaseNotesInput>
    create: XOR<ReportCreateWithoutCaseNotesInput, ReportUncheckedCreateWithoutCaseNotesInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutCaseNotesInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutCaseNotesInput, ReportUncheckedUpdateWithoutCaseNotesInput>
  }

  export type ReportUpdateWithoutCaseNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutCaseNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type UserUpsertWithoutCaseNotesInput = {
    update: XOR<UserUpdateWithoutCaseNotesInput, UserUncheckedUpdateWithoutCaseNotesInput>
    create: XOR<UserCreateWithoutCaseNotesInput, UserUncheckedCreateWithoutCaseNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCaseNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCaseNotesInput, UserUncheckedUpdateWithoutCaseNotesInput>
  }

  export type UserUpdateWithoutCaseNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutSubmittedByNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReviewerNestedInput
    auditEvents?: AuditEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCaseNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutSubmittedByNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReviewerNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditEventsInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutSubmittedByInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReviewerInput
    caseNotes?: CaseNoteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutAuditEventsInput = {
    id?: string
    email: string
    password?: string | null
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
    googleId?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutSubmittedByInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReviewerInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutAuditEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditEventsInput, UserUncheckedCreateWithoutAuditEventsInput>
  }

  export type ReportCreateWithoutAuditEventsInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutAuditEventsInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
    trendSnapshots?: TrendSnapshotUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutAuditEventsInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutAuditEventsInput, ReportUncheckedCreateWithoutAuditEventsInput>
  }

  export type UserUpsertWithoutAuditEventsInput = {
    update: XOR<UserUpdateWithoutAuditEventsInput, UserUncheckedUpdateWithoutAuditEventsInput>
    create: XOR<UserCreateWithoutAuditEventsInput, UserUncheckedCreateWithoutAuditEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditEventsInput, UserUncheckedUpdateWithoutAuditEventsInput>
  }

  export type UserUpdateWithoutAuditEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutSubmittedByNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReviewerNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutSubmittedByNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReviewerNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ReportUpsertWithoutAuditEventsInput = {
    update: XOR<ReportUpdateWithoutAuditEventsInput, ReportUncheckedUpdateWithoutAuditEventsInput>
    create: XOR<ReportCreateWithoutAuditEventsInput, ReportUncheckedCreateWithoutAuditEventsInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutAuditEventsInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutAuditEventsInput, ReportUncheckedUpdateWithoutAuditEventsInput>
  }

  export type ReportUpdateWithoutAuditEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutAuditEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateWithoutTrendSnapshotsInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy?: UserCreateNestedOneWithoutReportsInput
    indicators?: ReportIndicatorCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceCreateNestedManyWithoutReportBInput
  }

  export type ReportUncheckedCreateWithoutTrendSnapshotsInput = {
    id?: string
    submittedById?: string | null
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
    indicators?: ReportIndicatorUncheckedCreateNestedManyWithoutReportInput
    reviewDecisions?: ReviewDecisionUncheckedCreateNestedManyWithoutReportInput
    caseNotes?: CaseNoteUncheckedCreateNestedManyWithoutReportInput
    auditEvents?: AuditEventUncheckedCreateNestedManyWithoutReportInput
    matchesAsA?: MatchEvidenceUncheckedCreateNestedManyWithoutReportAInput
    matchesAsB?: MatchEvidenceUncheckedCreateNestedManyWithoutReportBInput
  }

  export type ReportCreateOrConnectWithoutTrendSnapshotsInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutTrendSnapshotsInput, ReportUncheckedCreateWithoutTrendSnapshotsInput>
  }

  export type ReportUpsertWithoutTrendSnapshotsInput = {
    update: XOR<ReportUpdateWithoutTrendSnapshotsInput, ReportUncheckedUpdateWithoutTrendSnapshotsInput>
    create: XOR<ReportCreateWithoutTrendSnapshotsInput, ReportUncheckedCreateWithoutTrendSnapshotsInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutTrendSnapshotsInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutTrendSnapshotsInput, ReportUncheckedUpdateWithoutTrendSnapshotsInput>
  }

  export type ReportUpdateWithoutTrendSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneWithoutReportsNestedInput
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
  }

  export type ReportUncheckedUpdateWithoutTrendSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    submittedById?: NullableStringFieldUpdateOperationsInput | string | null
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
  }

  export type ReportCreateManySubmittedByInput = {
    id?: string
    contentType: string
    rawContent: string
    publicSummary?: string | null
    platform?: string | null
    targetRegion?: string | null
    riskLevel?: $Enums.RiskLevel
    riskScore?: number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: string | null
    status?: $Enums.ReportStatus
    sourceType?: $Enums.SourceType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewDecisionCreateManyReviewerInput = {
    id?: string
    reportId: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseNoteCreateManyAuthorInput = {
    id?: string
    reportId: string
    content: string
    createdAt?: Date | string
  }

  export type AuditEventCreateManyUserInput = {
    id?: string
    reportId?: string | null
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReportUpdateWithoutSubmittedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutSubmittedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    indicators?: ReportIndicatorUncheckedUpdateManyWithoutReportNestedInput
    reviewDecisions?: ReviewDecisionUncheckedUpdateManyWithoutReportNestedInput
    caseNotes?: CaseNoteUncheckedUpdateManyWithoutReportNestedInput
    auditEvents?: AuditEventUncheckedUpdateManyWithoutReportNestedInput
    matchesAsA?: MatchEvidenceUncheckedUpdateManyWithoutReportANestedInput
    matchesAsB?: MatchEvidenceUncheckedUpdateManyWithoutReportBNestedInput
    trendSnapshots?: TrendSnapshotUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutSubmittedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    rawContent?: StringFieldUpdateOperationsInput | string
    publicSummary?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    targetRegion?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    riskScore?: FloatFieldUpdateOperationsInput | number
    evidenceJson?: NullableJsonNullValueInput | InputJsonValue
    storyModeJson?: NullableJsonNullValueInput | InputJsonValue
    nextStepsJson?: NullableJsonNullValueInput | InputJsonValue
    caveat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewDecisionUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutReviewDecisionsNestedInput
  }

  export type ReviewDecisionUncheckedUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewDecisionUncheckedUpdateManyWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseNoteUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneRequiredWithoutCaseNotesNestedInput
  }

  export type CaseNoteUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseNoteUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    report?: ReportUpdateOneWithoutAuditEventsNestedInput
  }

  export type AuditEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportIndicatorCreateManyReportInput = {
    id?: string
    indicatorId: string
    context?: string | null
  }

  export type ReviewDecisionCreateManyReportInput = {
    id?: string
    reviewerId: string
    status: $Enums.ReportStatus
    rationale: string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CaseNoteCreateManyReportInput = {
    id?: string
    authorId: string
    content: string
    createdAt?: Date | string
  }

  export type AuditEventCreateManyReportInput = {
    id?: string
    userId?: string | null
    action: $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MatchEvidenceCreateManyReportAInput = {
    id?: string
    reportBId: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MatchEvidenceCreateManyReportBInput = {
    id?: string
    reportAId: string
    similarityScore: number
    matchedClues: JsonNullValueInput | InputJsonValue
    differences: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TrendSnapshotCreateManyReportInput = {
    id?: string
    date: Date | string
    contentType?: string | null
    riskLevel?: $Enums.RiskLevel | null
    tactic?: string | null
    reportCount?: number
    sampleReport?: string | null
    createdAt?: Date | string
  }

  export type ReportIndicatorUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    indicator?: IndicatorUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportIndicatorUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    indicatorId?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportIndicatorUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    indicatorId?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewDecisionUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewer?: UserUpdateOneRequiredWithoutReviewDecisionsNestedInput
  }

  export type ReviewDecisionUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewDecisionUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    reviewerId?: StringFieldUpdateOperationsInput | string
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    rationale?: StringFieldUpdateOperationsInput | string
    redactions?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseNoteUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutCaseNotesNestedInput
  }

  export type CaseNoteUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CaseNoteUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditEventsNestedInput
  }

  export type AuditEventUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEvidenceUpdateWithoutReportAInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportB?: ReportUpdateOneRequiredWithoutMatchesAsBNestedInput
  }

  export type MatchEvidenceUncheckedUpdateWithoutReportAInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportBId?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEvidenceUncheckedUpdateManyWithoutReportAInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportBId?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEvidenceUpdateWithoutReportBInput = {
    id?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportA?: ReportUpdateOneRequiredWithoutMatchesAsANestedInput
  }

  export type MatchEvidenceUncheckedUpdateWithoutReportBInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportAId?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchEvidenceUncheckedUpdateManyWithoutReportBInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportAId?: StringFieldUpdateOperationsInput | string
    similarityScore?: FloatFieldUpdateOperationsInput | number
    matchedClues?: JsonNullValueInput | InputJsonValue
    differences?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrendSnapshotUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableEnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel | null
    tactic?: NullableStringFieldUpdateOperationsInput | string | null
    reportCount?: IntFieldUpdateOperationsInput | number
    sampleReport?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrendSnapshotUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableEnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel | null
    tactic?: NullableStringFieldUpdateOperationsInput | string | null
    reportCount?: IntFieldUpdateOperationsInput | number
    sampleReport?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrendSnapshotUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableEnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel | null
    tactic?: NullableStringFieldUpdateOperationsInput | string | null
    reportCount?: IntFieldUpdateOperationsInput | number
    sampleReport?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportIndicatorCreateManyIndicatorInput = {
    id?: string
    reportId: string
    context?: string | null
  }

  export type ReportIndicatorUpdateWithoutIndicatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    report?: ReportUpdateOneRequiredWithoutIndicatorsNestedInput
  }

  export type ReportIndicatorUncheckedUpdateWithoutIndicatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportIndicatorUncheckedUpdateManyWithoutIndicatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}