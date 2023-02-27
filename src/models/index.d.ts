import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerVictory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Victory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user: string;
  readonly victoryText: string;
  readonly victoryImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVictory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Victory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user: string;
  readonly victoryText: string;
  readonly victoryImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Victory = LazyLoading extends LazyLoadingDisabled ? EagerVictory : LazyVictory

export declare const Victory: (new (init: ModelInit<Victory>) => Victory) & {
  copyOf(source: Victory, mutator: (draft: MutableModel<Victory>) => MutableModel<Victory> | void): Victory;
}