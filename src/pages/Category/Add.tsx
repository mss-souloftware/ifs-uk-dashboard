import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const VERSION = import.meta.env.VITE_BACKEND_API_VERSION;

const AddCategory: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    longDescription: '',
    needConsultation: false,
    type: '' as
      | 'MEN_HEALTH'
      | 'WOMEN_HEALTH'
      | 'RESPIRATORY_AND_DIGESTIVE'
      | 'GENERAL_HEALTH'
      | 'TRAVEL'
      | 'SKIN_CARE',
  });

  const [consultationQuestions, setConsultationQuestions] = useState<any[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (type: typeof formData.type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const handleConsultationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, needConsultation: e.target.checked });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');
    if (!formData.type) return alert('Select a category');

    try {
      const res = await fetch(
        `${BASE_URL}/api/${VERSION}/products/categories`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            consultationQuestions: formData.needConsultation
              ? { questions: consultationQuestions }
              : null,
          }),
        },
      );

      const result = await res.json();
      if (result.status?.success) {
        alert('Category created!');
        // Reset formData
        setFormData({
          name: '',
          shortDescription: '',
          longDescription: '',
          needConsultation: false,
          type: '' as typeof formData.type,
        });

        setConsultationQuestions([]);
      } else {
        alert('Failed: ' + result.message);
      }
    } catch (err) {
      alert('Something went wrong');
    }
  };

  // ---------- Q&A Functions ----------

  const addQuestion = () => {
    setConsultationQuestions([
      ...consultationQuestions,
      {
        questionText: '',
        answers: [
          { text: '', isCorrect: false, message: '', followUpQuestions: [] },
        ],
      },
    ]);
  };

  const removeQuestion = (qIndex: number) => {
    const updated = [...consultationQuestions];
    updated.splice(qIndex, 1);
    setConsultationQuestions(updated);
  };

  const addAnswer = (qIndex: number) => {
    const updated = [...consultationQuestions];
    updated[qIndex].answers.push({
      text: '',
      isCorrect: false,
      message: '',
      followUpQuestions: [],
    });
    setConsultationQuestions(updated);
  };

  const removeAnswer = (qIndex: number, aIndex: number) => {
    const updated = [...consultationQuestions];
    updated[qIndex].answers.splice(aIndex, 1);
    setConsultationQuestions(updated);
  };

  const addFollowUp = (qIndex: number, aIndex: number) => {
    const updated = [...consultationQuestions];
    updated[qIndex].answers[aIndex].followUpQuestions.push({
      questionText: '',
      answers: [
        { text: '', isCorrect: false, message: '', followUpQuestions: [] },
      ],
    });
    setConsultationQuestions(updated);
  };

  const removeFollowUp = (qIndex: number, aIndex: number, fIndex: number) => {
    const updated = [...consultationQuestions];
    updated[qIndex].answers[aIndex].followUpQuestions.splice(fIndex, 1);
    setConsultationQuestions(updated);
  };

  const updateField = (qIndex: number, field: string, value: string) => {
    const updated = [...consultationQuestions];
    updated[qIndex][field] = value;
    setConsultationQuestions(updated);
  };

  const updateAnswer = (
    qIndex: number,
    aIndex: number,
    field: string,
    value: any,
  ) => {
    const updated = [...consultationQuestions];
    updated[qIndex].answers[aIndex][field] = value;
    setConsultationQuestions(updated);
  };

  const updateFollowUpField = (
    qIndex: number,
    aIndex: number,
    fIndex: number,
    field: string,
    value: any,
  ) => {
    const updated = [...consultationQuestions];
    updated[qIndex].answers[aIndex].followUpQuestions[fIndex][field] = value;
    setConsultationQuestions(updated);
  };

  return (
    <>
      <Breadcrumb pageName="Add New Category" />
      <div className="flex gap-5 flex-col sm:flex-row">
        {/* Left - Main Form */}
        <div className="flex flex-col gap-5 w-9/12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4 px-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Category Name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Short Description
              </label>
              <ReactQuill
                value={formData.shortDescription}
                onChange={(value) =>
                  setFormData({ ...formData, shortDescription: value })
                }
                className="bg-white rounded"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Long Description
              </label>
              <ReactQuill
                value={formData.longDescription}
                onChange={(value) =>
                  setFormData({ ...formData, longDescription: value })
                }
                className="bg-white rounded"
              />
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={formData.needConsultation}
                onChange={handleConsultationChange}
                className="w-4 h-4 accent-primary"
              />
              <label className="ml-2 block text-black dark:text-white">
                Need Consultation?
              </label>
            </div>
          </div>

          {formData.needConsultation && (
            <div className="rounded border border-stroke p-4 bg-white dark:bg-boxdark">
              <div className="mb-4">
                <button
                  onClick={addQuestion}
                  className="rounded bg-[#30BFAC] px-4 py-2 text-white hover:bg-opacity-90"
                  type="button"
                >
                  + Add Question
                </button>
              </div>

              {consultationQuestions.map((q, qIndex) => (
                <div key={qIndex} className="mb-6 border-b pb-4">
                  <div className="flex items-center mb-2 gap-2">
                    <ReactQuill
                      value={q.questionText}
                      onChange={(value) => updateField(qIndex, 'questionText', value)}
                      placeholder={`Question ${qIndex + 1}`}
                    />
                    <button
                      onClick={() => removeQuestion(qIndex)}
                      type="button"
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove Question
                    </button>
                  </div>

                  {q.answers.map((a, aIndex) => (
                    <div
                      key={aIndex}
                      className="pl-4 mb-3 border rounded p-3 relative"
                    >
                      <ReactQuill
                        value={a.text}
                        onChange={(value) =>
                          updateAnswer(qIndex, aIndex, 'text', value)
                        }
                        placeholder="Answer text"
                        className="mb-2"
                      />

                      <ReactQuill
                        value={a.message}
                        onChange={(value) =>
                          updateAnswer(qIndex, aIndex, 'message', value)
                        }
                        placeholder="Answer message"
                        className="mb-2"
                      />


                      <label className="inline-flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={a.isCorrect}
                          onChange={(e) =>
                            updateAnswer(
                              qIndex,
                              aIndex,
                              'isCorrect',
                              e.target.checked,
                            )
                          }
                        />
                        <span className="text-sm">Is Correct</span>
                      </label>

                      <button
                        onClick={() => addFollowUp(qIndex, aIndex)}
                        className="mb-2 rounded bg-secondary px-2 py-1 text-xs text-white"
                        type="button"
                      >
                        + Add Follow-Up
                      </button>

                      <button
                        onClick={() => removeAnswer(qIndex, aIndex)}
                        className="absolute top-2 right-2 text-red-600 hover:underline text-xs"
                        type="button"
                      >
                        Remove Answer
                      </button>

                      {a.followUpQuestions?.map((fq, fIndex) => (
                        <div
                          key={fIndex}
                          className="ml-4 mt-2 border-l pl-4 relative"
                        >
                          <ReactQuill
                            value={fq.questionText}
                            onChange={(value) =>
                              updateFollowUpField(
                                qIndex,
                                aIndex,
                                fIndex,
                                'questionText',
                                value,
                              )
                            }
                            placeholder="Follow-up Question"
                          />

                          <button
                            onClick={() =>
                              removeFollowUp(qIndex, aIndex, fIndex)
                            }
                            className="text-red-600 hover:underline text-xs absolute top-1 right-1"
                            type="button"
                          >
                            Remove Follow-Up
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    onClick={() => addAnswer(qIndex)}
                    className="rounded bg-green-600 text-white px-3 py-1 text-sm"
                    type="button"
                  >
                    + Add Answer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Sidebar */}
        <div className="flex flex-col gap-9 w-1/4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Categories Types
              </h3>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {[
                'MEN_HEALTH',
                'WOMEN_HEALTH',
                'RESPIRATORY_AND_DIGESTIVE',
                'GENERAL_HEALTH',
                'TRAVEL',
                'SKIN_CARE',
              ].map((category) => (
                <label
                  key={category}
                  htmlFor={`category-${category}`}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer 
                  ${formData.type === category
                      ? 'border-primary bg-[#30BFAC]/10 text-[#30BFAC]'
                      : 'border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    value={category}
                    checked={formData.type === category}
                    onChange={() =>
                      handleCategoryChange(category as typeof formData.type)
                    }
                    className="hidden"
                  />
                  <div
                    className={`h-5 w-5 flex items-center justify-center rounded-full border-2 
                    ${formData.type === category
                        ? 'border-primary bg-[#30BFAC]'
                        : 'border-gray-400'
                      }`}
                  >
                    {formData.type === category && (
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {category.replace(/_/g, ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default py-4 px-6.5">
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded bg-[#30BFAC] p-3 font-medium text-white"
              type="button"
            >
              Publish
            </button>
            <Link
              to="#"
              className="text-center text-sm text-[#30BFAC] mt-4 inline-block hover:underline"
            >
              Delete Product
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
