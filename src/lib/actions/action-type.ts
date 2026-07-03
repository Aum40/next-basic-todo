type ErrorResponse = {
  success: false;
  message: string;
  details?: unknown;
  code: string;
};

type SuccessResponse<T = unknown> = {
  success: true;
  data?: T;
};

export type ActionResult<T = unknown> = SuccessResponse<T> | ErrorResponse;
