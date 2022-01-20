import Http from "@/services/http";

export default function(http: Http) {
  return {
    getPublic() {
      return http.get("/public");
    },
  };
}
