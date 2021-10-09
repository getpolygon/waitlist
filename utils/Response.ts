export enum Status {
  OK,
  ERR,
}

const Response = (status: Status, message: string) => ({ status, message });

export default Response;
