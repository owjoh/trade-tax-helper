export const parseCsvFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            const row: any = {};
            headers.forEach((header, index) => {
              let value = values[index]?.trim();
              if (['quantity', 'price', 'total'].includes(header.toLowerCase())) {
                value = parseFloat(value);
              }
              row[header.toLowerCase()] = value;
            });
            return row;
          });
          
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};