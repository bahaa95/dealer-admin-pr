import { AxiosError } from "axios";
import {
  UseQueryOptions as QueryOptions,
  UseMutationOptions as MutationOptions,
} from "@tanstack/react-query";

export type UseMutationOptions<
  TData = unknown,
  TSchema = unknown
> = MutationOptions<TData, AxiosError<unknown, any>, TSchema, unknown>;

export type UseQueryOptions<TData = unknown> = QueryOptions<
  TData,
  Error,
  TData,
  any
>;
