const styles = {
    gridColumns: 6,
    gridRows: 4,
    itemPadding: '20px',
    itemBorderRadius: '12px',
    outlineWidth: '4px',
    
    // Function to darken a color by 10%
    darkenColor: (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        const darker = [r, g, b].map(x => Math.floor(x * 0.9));
        
        return '#' + darker.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },
    
    // Function to lighten a color by 10%
    lightenColor: (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        const lighter = [r, g, b].map(x => Math.floor(x + ((255 - x) * 0.1)));
        
        return '#' + lighter.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    },
    
    // Function to determine if a color is light
    isLightColor: (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155;
    }
};
