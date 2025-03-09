// pages/category/index.js

import CategoryList from '../../components/category';
import Layout from '../../components/layout';

export default function Categories() {
  return (
    <Layout>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Car Categories</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our vehicles by category to find the perfect match for your needs and preferences
            </p>
          </div>
          
          <CategoryList />
        </div>
      </section>
    </Layout>
  );
}