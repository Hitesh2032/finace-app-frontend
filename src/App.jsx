import React, { useEffect, useState } from 'react';
import { fetchDepartments } from './api/department';
import { buildTree } from './utils/treeBuilder';
import DepartmentTree from './components/DepartmentTree';
import { Container, Typography } from '@mui/material';

function App() {
  const [treeData, setTreeData] = useState([]);

  const loadData = async () => {
    const res = await fetchDepartments();
    const flatData = res.data;
    const tree = buildTree(flatData);
    setTreeData(tree);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Department Budget Manager
      </Typography>
      <DepartmentTree data={treeData} onRefresh={loadData} />
    </Container>
  );
}

export default App;
