import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** classroom  */
export type Classroom = {
  __typename?: 'Classroom';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lessons: Array<Scalars['String']>;
  name: Scalars['String'];
  teacherId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClassroom: Classroom;
  removeClassroom: Scalars['Boolean'];
  updateClassroom: Classroom;
};


export type MutationAddClassroomArgs = {
  newClassroomData: NewClassroomInput;
};


export type MutationRemoveClassroomArgs = {
  id: Scalars['String'];
};


export type MutationUpdateClassroomArgs = {
  updateClassroomData: UpdateClassroomInput;
};

export type NewClassroomInput = {
  description?: Maybe<Scalars['String']>;
  lessons: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  classroom: Classroom;
  classrooms: Array<Classroom>;
};


export type QueryClassroomArgs = {
  id: Scalars['String'];
};


export type QueryClassroomsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  classroomDelete: Scalars['String'];
  classroomUpdated: Classroom;
  classrooms: Classroom;
};


export type SubscriptionClassroomUpdatedArgs = {
  id: Scalars['String'];
};

export type UpdateClassroomInput = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lessons?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
};

export type ClassroomsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassroomsQuery = { __typename?: 'Query', classrooms: Array<{ __typename?: 'Classroom', id: string, name: string, description?: string | null | undefined, createdAt: any, lessons: Array<string>, teacherId: string }> };

export type ClassroomAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ClassroomAddedSubscription = { __typename?: 'Subscription', classrooms: { __typename?: 'Classroom', id: string, name: string, description?: string | null | undefined, createdAt: any, lessons: Array<string>, teacherId: string } };


export const ClassroomsDocument = gql`
    query classrooms {
  classrooms {
    id
    name
    description
    createdAt
    lessons
    teacherId
  }
}
    `;

/**
 * __useClassroomsQuery__
 *
 * To run a query within a React component, call `useClassroomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassroomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassroomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClassroomsQuery(baseOptions?: Apollo.QueryHookOptions<ClassroomsQuery, ClassroomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClassroomsQuery, ClassroomsQueryVariables>(ClassroomsDocument, options);
      }
export function useClassroomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassroomsQuery, ClassroomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClassroomsQuery, ClassroomsQueryVariables>(ClassroomsDocument, options);
        }
export type ClassroomsQueryHookResult = ReturnType<typeof useClassroomsQuery>;
export type ClassroomsLazyQueryHookResult = ReturnType<typeof useClassroomsLazyQuery>;
export type ClassroomsQueryResult = Apollo.QueryResult<ClassroomsQuery, ClassroomsQueryVariables>;
export const ClassroomAddedDocument = gql`
    subscription classroomAdded {
  classrooms {
    id
    name
    description
    createdAt
    lessons
    teacherId
  }
}
    `;

/**
 * __useClassroomAddedSubscription__
 *
 * To run a query within a React component, call `useClassroomAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useClassroomAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassroomAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useClassroomAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ClassroomAddedSubscription, ClassroomAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ClassroomAddedSubscription, ClassroomAddedSubscriptionVariables>(ClassroomAddedDocument, options);
      }
export type ClassroomAddedSubscriptionHookResult = ReturnType<typeof useClassroomAddedSubscription>;
export type ClassroomAddedSubscriptionResult = Apollo.SubscriptionResult<ClassroomAddedSubscription>;