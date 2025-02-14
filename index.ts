import { CustomAttributeType, Entity } from "electrodb";

export type UUID = string;

export type BrokenUser = {
  name: string;
  id: UUID;
};

export type OkayUser = {
  name: string;
};

const BrokenUserEntity = new Entity({
  model: {
    entity: "user",
    service: "example",
    version: "1",
  },
  attributes: {
    name: {
      type: "string",
    },
    aggregateId: {
      type: CustomAttributeType<UUID>("string"),
      required: true,
    },
  },
  indexes: {
    byAggregate: {
      pk: {
        field: "pk",
        composite: ["aggregateId"],
      },
      sk: {
        field: "sk",
        composite: [],
      },
    },
  },
});

const OkayUserEntity = new Entity({
  model: {
    entity: "user",
    service: "glove-api",
    version: "1",
  },
  attributes: {
    aggregateId: {
      type: "string",
      get: (value: string) => value as UUID,
      required: true,
    },
  },
  indexes: {
    byAggregate: {
      pk: {
        field: "pk",
        composite: ["aggregateId"],
      },
      sk: {
        field: "sk",
        composite: [],
      },
    },
  },
});

export { BrokenUserEntity, OkayUserEntity };
