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

/** recipe  */
export type Classroom = {
  __typename?: 'Classroom';
  creationDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lessons: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClassroom: Classroom;
  removeClassroom: Scalars['Boolean'];
};


export type MutationAddClassroomArgs = {
  newClassroomData: NewClassroomInput;
};


export type MutationRemoveClassroomArgs = {
  id: Scalars['String'];
};

export type NewClassroomInput = {
  description?: Maybe<Scalars['String']>;
  lessons: Array<Scalars['String']>;
  title: Scalars['String'];
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
  classroomAdded: Classroom;
};

export type ClassroomQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ClassroomQuery = { __typename?: 'Query', classroom: { __typename?: 'Classroom', id: string, creationDate: any, description?: string | null | undefined, title: string, lessons: Array<string> } };


export const ClassroomDocument = gql`
    query classroom($id: String!) {
  classroom(id: $id) {
    id
    creationDate
    description
    title
    lessons
  }
}
    `;

/**
 * __useClassroomQuery__
 *
 * To run a query within a React component, call `useClassroomQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassroomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassroomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClassroomQuery(baseOptions: Apollo.QueryHookOptions<ClassroomQuery, ClassroomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClassroomQuery, ClassroomQueryVariables>(ClassroomDocument, options);
      }
export function useClassroomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassroomQuery, ClassroomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClassroomQuery, ClassroomQueryVariables>(ClassroomDocument, options);
        }
export type ClassroomQueryHookResult = ReturnType<typeof useClassroomQuery>;
export type ClassroomLazyQueryHookResult = ReturnType<typeof useClassroomLazyQuery>;
export type ClassroomQueryResult = Apollo.QueryResult<ClassroomQuery, ClassroomQueryVariables>;