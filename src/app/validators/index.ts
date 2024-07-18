export const required: IValidator = (value: string) => {
  return !!value;
};

export const password: IValidator = (value: string) => {
  return new RegExp('^(?=.*[A-Z])(?=.*[\\W_]).{8,}$').test(value);
};
