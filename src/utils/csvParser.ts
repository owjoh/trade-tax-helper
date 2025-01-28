interface Trade {
  date: string;
  type: string;
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  [key: string]: string | number; // Allow both string and number values
}

export const parseCsvFile = async (file: File): Promise<Trade[]> => {
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
            const row: Trade = {
              date: '',
              type: '',
              symbol: '',
              quantity: 0,
              price: 0,
              total: 0
            };
            
            headers.forEach((header, index) => {
              const value = values[index]?.trim() || '';
              const headerLower = header.toLowerCase();
              
              if (['quantity', 'price', 'total'].includes(headerLower)) {
                (row as any)[headerLower] = parseFloat(value) || 0;
              } else {
                (row as any)[headerLower] = value;
              }
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