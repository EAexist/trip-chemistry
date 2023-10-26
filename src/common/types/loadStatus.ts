enum LoadStatus {
    REST = 'rest',
    PENDING = 'pending', 
    SUCCESS = 'success',
    MISS = 'miss',
    FAIL = 'fail',
}

interface LoadStatusProps {
    status: LoadStatus;
    setStatus: (status: LoadStatus)=>void;
}

export { LoadStatus };
export type { LoadStatusProps };