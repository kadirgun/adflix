import PublisherLayout from '@/layouts/PublisherLayout';
import React, { ReactElement } from 'react'

const Index = () => {
  return (
    <div>Publisher Dashboard</div>
  )
}

Index.getLayout = (page: ReactElement) => <PublisherLayout>{page}</PublisherLayout>;
export default Index