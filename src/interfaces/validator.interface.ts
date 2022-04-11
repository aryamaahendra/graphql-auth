export interface IValidator {
   validate<T extends object>(
      data: T,
      method?: "CREATE" | "UPDATE" | undefined
   ): Promise<T>;
}
