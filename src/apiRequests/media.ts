import http from "@/utils/http";

export const mediaApiRequests = {
  upload: (formdata: FormData) => {
    return http.post("/media/upload", formdata);
  },
};
