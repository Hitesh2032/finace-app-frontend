import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  TextField,
  Button,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Edit,
  Save,
} from '@mui/icons-material';
import { updateDepartment } from '../api/department';

const DepartmentTree = ({ data, onRefresh }) => {
  const [openNodes, setOpenNodes] = useState({});
  const [editingNodes, setEditingNodes] = useState({});
  const [valuesMap, setValuesMap] = useState({});

  const toggleOpen = (id) => {
    setOpenNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEditing = (id, node) => {
    setEditingNodes(prev => ({ ...prev, [id]: !prev[id] }));
    setValuesMap(prev => ({
      ...prev,
      [id]: {
        supplies: node.supplies ?? '',
        hardware: node.hardware ?? '',
        salary: node.salary ?? '',
      },
    }));
  };

  const handleChange = (id, key, val) => {
    setValuesMap(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: val,
      },
    }));
  };

  const handleSave = async (id) => {
    await updateDepartment(id, valuesMap[id]);
    setEditingNodes(prev => ({ ...prev, [id]: false }));
    onRefresh();
  };

  const renderNode = (node) => {
    const isLeaf = !node.children || node.children.length === 0;
    const open = openNodes[node.id] || false;
    const editing = editingNodes[node.id] || false;
    const values = valuesMap[node.id] || {
      supplies: node.supplies ?? '',
      hardware: node.hardware ?? '',
      salary: node.salary ?? '',
    };

    return (
      <Box key={node.id} sx={{ ml: 2, mt: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          {!isLeaf && (
            <IconButton size="small" onClick={() => toggleOpen(node.id)}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
          <Typography variant="body1" fontWeight="bold">
            {node.name}
          </Typography>
          {isLeaf && !editing && (
            <IconButton onClick={() => toggleEditing(node.id, node)} size="small">
              <Edit fontSize="small" />
            </IconButton>
          )}
          {editing && (
            <Button
              onClick={() => handleSave(node.id)}
              size="small"
              variant="contained"
            >
              <Save fontSize="small" />
            </Button>
          )}
        </Box>

        <Box ml={4} display="flex" gap={2}>
          {['supplies', 'hardware', 'salary'].map(field => (
            <Box key={field}>
              {editing ? (
                <TextField
                  label={field}
                  size="small"
                  value={values[field]}
                  onChange={(e) => handleChange(node.id, field, e.target.value)}
                />
              ) : (
                <Typography variant="body2">
                  {field}: {node[field] ?? '-'}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {open && node.children?.map(child => renderNode(child))}
      </Box>
    );
  };

  return <Box>{data.map(renderNode)}</Box>;
};

export default DepartmentTree;
