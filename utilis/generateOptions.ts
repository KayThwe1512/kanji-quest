function generateOptions(data: any[], field: string, correct: string) {
  const pool = data
    .map((item) => item[field])
    .filter((value) => value !== correct);

  const shuffled = pool.sort(() => Math.random() - 0.5);

  const options = [...shuffled.slice(0, 3), correct];
  return options.sort(() => Math.random() - 0.5);
}
