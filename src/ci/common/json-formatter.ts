const jsonFormatter =
  (space: number) => 
  (object: { [key: string]: any }) => {
    return JSON.stringify(object, null, space);
  };

export default jsonFormatter;