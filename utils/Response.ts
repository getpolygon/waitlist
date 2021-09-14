const Response = (status: Status, message: string) => ({ status, message });
export enum Status {
  OK,
  ERR,
}
export default Response;
