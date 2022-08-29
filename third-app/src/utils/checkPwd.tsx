export function CheckPwd(text: any, setCheckRegex: any, checkRegex: any) {
  const newCheckRegex = { ...checkRegex };
  Object.keys(newCheckRegex).map((key) => {
    if (key === 'uppercase') {
      const isUpperCase = /[A-Z]/.test(text);
      const a = newCheckRegex[key] === isUpperCase ? isUpperCase : isUpperCase;
      setCheckRegex((prevCheckRegex: any) => ({
        ...prevCheckRegex,
        uppercase: a,
      }));
    }
    if (key === 'lowercase') {
      const isLowerCase = /[a-z]/.test(text);
      const b = newCheckRegex[key] === isLowerCase ? isLowerCase : isLowerCase;
      setCheckRegex((prevCheckRegex: any) => ({
        ...prevCheckRegex,
        lowercase: b,
      }));
    }
    if (key === 'number') {
      const isNumber = /[0-9]/.test(text);
      const c = newCheckRegex[key] === isNumber ? isNumber : isNumber;
      setCheckRegex((prevCheckRegex: any) => ({
        ...prevCheckRegex,
        number: c,
      }));
    }
    if (key === 'symbol') {
      const isSymbol = /[!@#$%^&*(),.?":{}|<>]/g.test(text);
      const c = newCheckRegex[key] === isSymbol ? isSymbol : isSymbol;
      setCheckRegex((prevCheckRegex: any) => ({
        ...prevCheckRegex,
        symbol: c,
      }));
    }
    if (key === 'lengthText') {
      const isLength =
        /^[a-zA-Z0-9-!$%@^&*()_+|~=`{}\]:";'<>?,.]{8,16}$/gm.test(text);
      const d = newCheckRegex[key] === isLength ? isLength : isLength;
      setCheckRegex((prevCheckRegex: any) => ({
        ...prevCheckRegex,
        lengthText: d,
      }));
    }
  });
}
