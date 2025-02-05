
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.1
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.1",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.LogScalarFieldEnum = {
  id: 'id',
  timestamp: 'timestamp',
  eventType: 'eventType',
  deleted: 'deleted',
  description: 'description',
  userId: 'userId',
  referenceId: 'referenceId',
  metadata: 'metadata'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.LogEventType = exports.$Enums.LogEventType = {
  RESERVATION_CREATED: 'RESERVATION_CREATED',
  RESERVATION_UPDATED: 'RESERVATION_UPDATED',
  RESERVATION_CONSULTED: 'RESERVATION_CONSULTED',
  RESERVATION_DELETED: 'RESERVATION_DELETED',
  RESERVATION_CANCELED: 'RESERVATION_CANCELED',
  VEHICLE_ENTRY: 'VEHICLE_ENTRY',
  VEHICLE_EXIT: 'VEHICLE_EXIT',
  SPOT_CREATED: 'SPOT_CREATED',
  SPOT_UPDATED: 'SPOT_UPDATED',
  SPOT_CONSULTED: 'SPOT_CONSULTED',
  SPOT_DELETED: 'SPOT_DELETED',
  AVAILABILITY_CHECKED: 'AVAILABILITY_CHECKED'
};

exports.Prisma.ModelName = {
  Log: 'Log'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "I:\\nestjs\\Herrera\\prueba práctica\\parking-api\\prisma\\mongodb\\mongodb\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "I:\\nestjs\\Herrera\\prueba práctica\\parking-api\\prisma\\mongodb\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "6.3.1",
  "engineVersion": "acc0b9dd43eb689cbd20c9470515d719db10d0b0",
  "datasourceNames": [
    "logs"
  ],
  "activeProvider": "mongodb",
  "postinstall": false,
  "inlineDatasources": {
    "logs": {
      "url": {
        "fromEnvVar": "MONGODB",
        "value": null
      }
    }
  },
  "inlineSchema": "datasource logs {\n  provider = \"mongodb\"\n  url      = env(\"MONGODB\")\n}\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"mongodb/client\"\n}\n\nmodel Log {\n  id          String       @id @default(auto()) @map(\"_id\") @logs.ObjectId\n  timestamp   DateTime     @default(now())\n  eventType   LogEventType\n  deleted     Boolean      @default(false)\n  description String\n  userId      Int?\n  referenceId String?\n  metadata    Json?\n}\n\nenum LogEventType {\n  RESERVATION_CREATED\n  RESERVATION_UPDATED\n  RESERVATION_CONSULTED\n  RESERVATION_DELETED\n  RESERVATION_CANCELED\n  VEHICLE_ENTRY\n  VEHICLE_EXIT\n  SPOT_CREATED\n  SPOT_UPDATED\n  SPOT_CONSULTED\n  SPOT_DELETED\n  AVAILABILITY_CHECKED\n}\n",
  "inlineSchemaHash": "e987ce805c578d775cec5976d6c120e59cb97b6d8cc745f56adf2306a1549266",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Log\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":[\"ObjectId\",[]],\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LogEventType\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deleted\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referenceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"LogEventType\":{\"values\":[{\"name\":\"RESERVATION_CREATED\",\"dbName\":null},{\"name\":\"RESERVATION_UPDATED\",\"dbName\":null},{\"name\":\"RESERVATION_CONSULTED\",\"dbName\":null},{\"name\":\"RESERVATION_DELETED\",\"dbName\":null},{\"name\":\"RESERVATION_CANCELED\",\"dbName\":null},{\"name\":\"VEHICLE_ENTRY\",\"dbName\":null},{\"name\":\"VEHICLE_EXIT\",\"dbName\":null},{\"name\":\"SPOT_CREATED\",\"dbName\":null},{\"name\":\"SPOT_UPDATED\",\"dbName\":null},{\"name\":\"SPOT_CONSULTED\",\"dbName\":null},{\"name\":\"SPOT_DELETED\",\"dbName\":null},{\"name\":\"AVAILABILITY_CHECKED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    MONGODB: typeof globalThis !== 'undefined' && globalThis['MONGODB'] || typeof process !== 'undefined' && process.env && process.env.MONGODB || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

