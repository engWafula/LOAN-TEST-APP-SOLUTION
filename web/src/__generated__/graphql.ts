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

export type Query = {
  __typename?: 'Query';
  loans: Array<Maybe<LoanType>>;
};

export type GetLoansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoansQuery = { __typename?: 'Query', loans: Array<{ __typename?: 'LoanType', id: number, name: string, interestRate: number, principal: number, dueDate: string, loanPayments?: Array<{ __typename?: 'LoanPaymentType', id: number, loanId: number, paymentDate?: string | null } | null> | null } | null> };


export const GetLoansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLoans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"loanPayments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"loanId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetLoansQuery, GetLoansQueryVariables>;