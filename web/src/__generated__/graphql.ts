/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type LoanConnection = {
  __typename?: 'LoanConnection';
  loans: Array<Maybe<LoanType>>;
  pagination: PaginationInfo;
};

export type LoanPaymentType = {
  __typename?: 'LoanPaymentType';
  id: Scalars['Int']['output'];
  loanId: Scalars['Int']['output'];
  paymentDate?: Maybe<Scalars['String']['output']>;
};

export type LoanType = {
  __typename?: 'LoanType';
  dueDate: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  interestRate: Scalars['Float']['output'];
  loanPayments?: Maybe<Array<Maybe<LoanPaymentType>>>;
  name: Scalars['String']['output'];
  principal: Scalars['Int']['output'];
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  hasNext: Scalars['Boolean']['output'];
  hasPrev: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  loans?: Maybe<LoanConnection>;
};


export type QueryLoansArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type GetLoansQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetLoansQuery = { __typename?: 'Query', loans?: { __typename?: 'LoanConnection', loans: Array<{ __typename?: 'LoanType', id: number, name: string, interestRate: number, principal: number, dueDate: string, loanPayments?: Array<{ __typename?: 'LoanPaymentType', id: number, loanId: number, paymentDate?: string | null } | null> | null } | null>, pagination: { __typename?: 'PaginationInfo', page: number, pageSize: number, total: number, totalPages: number, hasNext: boolean, hasPrev: boolean } } | null };


export const GetLoansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLoans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"loanPayments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"loanId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentDate"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrev"}}]}}]}}]}}]} as unknown as DocumentNode<GetLoansQuery, GetLoansQueryVariables>;