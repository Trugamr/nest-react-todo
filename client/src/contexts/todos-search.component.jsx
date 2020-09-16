import React from 'react'
import Search from 'antd/lib/input/Search'

const TodosSearch = ({ onSearch, isLoading }) => {
  const handleOnSearch = query => {
    const filters = {}
    if (query.trim().length) filters['query'] = query

    const completedPattern = /\bcomplete\b\b|\bcompleted\b|\bdone\b/i
    if (completedPattern.test(query)) {
      query = query.replace(completedPattern, '').trim()
      if (query.trim().length) filters['query'] = query
      else delete filters['query']
      filters['completed'] = true
    }
    const importantPattern = /\bfavourite\b\b|\bimportant\b|\bstar\b|\bstarred\b/i
    if (importantPattern.test(query)) {
      query = query.replace(importantPattern, '').trim()
      if (query.trim().length) filters['query'] = query
      else delete filters['query']
      filters['important'] = true
    }
    onSearch(filters)
  }

  return (
    <Search
      placeholder="Search todo"
      onSearch={handleOnSearch}
      enterButton="Search"
      size="large"
      loading={isLoading}
    />
  )
}
export default TodosSearch
