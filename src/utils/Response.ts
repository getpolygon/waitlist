export const enum Status {
  OK = "OK",
  ERR = "ERR",
}

class Response {
  constructor(status: Status, message: string) {
    return { status, message };
  }
}

export default Response;
