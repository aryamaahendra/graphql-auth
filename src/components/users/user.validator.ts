import { IValidator } from "@interfaces/validator.interface";
import { Service } from "typedi";
import * as yup from "yup";

@Service()
export class UserValidator implements IValidator {
   private _shape = {
      name: yup.string().min(2).max(64).required().trim(),
      email: yup.string().email().min(3).max(128).required().trim(),
   };

   public async validate<T extends object>(
      data: T,
      method?: "CREATE" | "UPDATE" | undefined
   ): Promise<T> {
      if (method === "CREATE") {
         const validated = await this._create(data);
         return validated as T;
      }
      const validated = await this._update(data);
      return validated as T;
   }

   private _create(data: object) {
      const schema = yup.object().shape({
         ...this._shape,
         password: yup.string().min(8).max(32).required(),
      });
      return schema.validate(data);
   }

   private _update(data: object) {
      const schema = yup.object().shape({
         ...this._shape,
      });
      return schema.validate(data);
   }
}
