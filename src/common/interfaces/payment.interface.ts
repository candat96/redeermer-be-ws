export interface PaymentWebhookPayload {
  id: string;
  event_type: string;
  create_time: string;
  resource_type: string;
  resource: {
    id: string;
    status: string;
    amount: {
      currency_code: string;
      value: string;
    };
    custom_id?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface PaymentWebhookResponse {
  success: boolean;
  message?: string;
  data?: any;
}
