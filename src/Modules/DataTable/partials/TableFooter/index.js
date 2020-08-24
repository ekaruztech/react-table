import { Pagination } from 'antd';
import React from 'react';

export default ({ currentPage, setCurrentPage, total }) => {
  return (
    <div className={'vmw-table-footer'}>
      <div className={'vmw-table-pagination-container'}>
        <Pagination
          onShowSizeChange={setCurrentPage}
          defaultCurrent={currentPage}
          total={total}
        />
      </div>
    </div>
  );
};
