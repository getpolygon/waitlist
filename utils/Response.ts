export enum Status {
  OK = "OK",
  ERR = "ERR",
}

const Response = (status: Status, message: string) => ({ status, message });

export default Response;
