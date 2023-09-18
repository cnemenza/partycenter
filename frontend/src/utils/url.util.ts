interface Params {
  key: string;
  value: any;
}

const createUrl = (base: string, params?: Params[]) => {
  const url = new URL(base);
  if (params) {
    params.forEach((param) => {
      if (param.value) {
        url.searchParams.append(param.key, param.value.toString());
      }
    });
  }

  return url.toString();
};

const createUrlSearchParams = (params?: Params[]) => {
  const urlParams = new URLSearchParams();

  if (params) {
    params.forEach((param) => {
      if (param.value) {
        urlParams.append(param.key, param.value.toString());
      }
    });
  }

  return urlParams;
};

export { createUrl, createUrlSearchParams };
