import { CreateDishBodyType, DishListResType, DishResType, UpdateDishBodyType } from "@/schemaValidations/dish.schema";
import http from "@/utils/http";

export const dishApiRequests = {
  list: () => {
    return http.get<DishListResType>("/dishes");
  },
  addDish: (body: CreateDishBodyType) => {
    return http.post<DishResType>("/dishes", body);
  },
  updateDish: (id: number, body: UpdateDishBodyType) => {
    return http.put<DishResType>(`/dishes/${id}`, body);
  },
  deleteDish: (id: number) => {
    return http.delete<DishResType>(`/dishes/${id}`);
  },
  getDishById: (id: number) => {
    return http.get<DishResType>(`/dishes/${id}`);
  },
};
