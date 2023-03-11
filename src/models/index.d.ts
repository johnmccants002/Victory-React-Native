import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSupporter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Supporter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySupporter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Supporter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Supporter = LazyLoading extends LazyLoadingDisabled ? EagerSupporter : LazySupporter

export declare const Supporter: (new (init: ModelInit<Supporter>) => Supporter) & {
  copyOf(source: Supporter, mutator: (draft: MutableModel<Supporter>) => MutableModel<Supporter> | void): Supporter;
}

type EagerVictoryType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<VictoryType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVictoryType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<VictoryType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type VictoryType = LazyLoading extends LazyLoadingDisabled ? EagerVictoryType : LazyVictoryType

export declare const VictoryType: (new (init: ModelInit<VictoryType>) => VictoryType) & {
  copyOf(source: VictoryType, mutator: (draft: MutableModel<VictoryType>) => MutableModel<VictoryType> | void): VictoryType;
}

type EagerUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aboutText?: string | null;
  readonly photoUrl?: string | null;
  readonly email: string;
  readonly fullName?: string | null;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aboutText?: string | null;
  readonly photoUrl?: string | null;
  readonly email: string;
  readonly fullName?: string | null;
  readonly userId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserProfile = LazyLoading extends LazyLoadingDisabled ? EagerUserProfile : LazyUserProfile

export declare const UserProfile: (new (init: ModelInit<UserProfile>) => UserProfile) & {
  copyOf(source: UserProfile, mutator: (draft: MutableModel<UserProfile>) => MutableModel<UserProfile> | void): UserProfile;
}

type EagerVictory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Victory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
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
  readonly user?: string | null;
  readonly victoryText: string;
  readonly victoryImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Victory = LazyLoading extends LazyLoadingDisabled ? EagerVictory : LazyVictory

export declare const Victory: (new (init: ModelInit<Victory>) => Victory) & {
  copyOf(source: Victory, mutator: (draft: MutableModel<Victory>) => MutableModel<Victory> | void): Victory;
}