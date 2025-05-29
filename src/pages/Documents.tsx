import React, { useState } from 'react';
import { Upload, Download, FileText, Eye } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';

const documents = [
  {
    id: 1,
    title: 'Pension Statement',
    date: '2024-03-01',
    type: 'PDF',
    size: '2.5 MB',
    url: 'https://example.com/documents/pension-statement.pdf'
  },
  {
    id: 2,
    title: 'Tax Certificate',
    date: '2024-02-15',
    type: 'PDF',
    size: '1.8 MB',
    url: 'https://example.com/documents/tax-certificate.pdf'
  },
  {
    id: 3,
    title: 'Investment Report',
    date: '2024-01-31',
    type: 'PDF',
    size: '3.2 MB',
    url: 'https://example.com/documents/investment-report.pdf'
  },
];

export const Documents = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      alert(`File "${file.name}" selected for upload`);
    }
  };

  const handleDownload = (document: typeof documents[0]) => {
    window.open(document.url, '_blank');
  };

  const handleView = (document: typeof documents[0]) => {
    window.open(document.url, '_blank');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        actions={
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
            />
            <Button
              variant="primary"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </div>
        }
      />

      <Card>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-100">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-light-200">Recent Documents</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-dark-100">
          {documents.map((document) => (
            <div
              key={document.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-100/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-light-200">
                    {document.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {document.date} • {document.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleView(document)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDownload(document)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};