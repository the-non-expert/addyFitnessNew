export function formatDate(dateString) {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    
    return new Date(dateString).toLocaleDateString('en-IN', options);
  }