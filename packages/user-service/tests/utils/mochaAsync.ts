export const mochaAsync = (fn:any) => {
    return (done:any) => {
      fn.call().then(done, (err:Error) => {
        done(err);
      });
    };
  };