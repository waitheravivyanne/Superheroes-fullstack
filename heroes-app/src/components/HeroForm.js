import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

axios.defaults.baseURL = 'http://localhost:5555';

function HeroForm({ onHeroCreated, onPowerCreated }) {
  const heroInitialValues = {
    heroName: '',
    superName: '',
  };

  const powerInitialValues = {
    powerName: '',
    powerDescription: '',
  };

  const [showHeroForm, setShowHeroForm] = useState(false);
  const [showPowerForm, setShowPowerForm] = useState(false);

  const heroValidationSchema = Yup.object({
    heroName: Yup.string().required('Hero Name is required'),
    superName: Yup.string().required('Super Name is required'),
  });

  const powerValidationSchema = Yup.object({
    powerName: Yup.string().required('Power Name is required'),
    powerDescription: Yup.string().required('Power Description is required'),
  });

  const handleHeroSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('/heroes', {
        name: values.heroName,
        super_name: values.superName,
      });

      resetForm();
      onHeroCreated(response.data);
    } catch (error) {
      console.error('Error adding hero:', error);
    } finally {
      setSubmitting(false);
    }
  };
  

  const handlePowerSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('/powers', {
        name: values.powerName,
        description: values.powerDescription,
      });

      console.log('Power created:', response.data);


      resetForm();
      onPowerCreated(response.data);
    } catch (error) {
      console.error('Error creating power:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Link to="/powers"> 
        <button className="button">Go to Powers</button>
      </Link>

      <button
        className="button"
        onClick={() => setShowHeroForm(!showHeroForm)}
      >
        {showHeroForm ? 'Hide Hero Form' : 'Add a Hero'}
      </button>

      {showHeroForm && (
        <div>
          <h2>Add a Hero</h2>
          <Formik
            initialValues={heroInitialValues}
            validationSchema={heroValidationSchema}
            onSubmit={handleHeroSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="heroName">Hero Name</label>
                  <Field type="text" name="heroName" />
                  <ErrorMessage name="heroName" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="superName">Super Name</label>
                  <Field type="text" name="superName" />
                  <ErrorMessage name="superName" component="div" className="error" />
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Add Hero
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <button
        className="button"
        onClick={() => setShowPowerForm(!showPowerForm)}
      >
        {showPowerForm ? 'Hide Power Form' : 'Create New Power'}
      </button>

      {showPowerForm && (
        <div>
          <h2>Create New Power</h2>
          <Formik
            initialValues={powerInitialValues}
            validationSchema={powerValidationSchema}
            onSubmit={handlePowerSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="powerName">Power Name</label>
                  <Field type="text" name="powerName" />
                  <ErrorMessage name="powerName" component="div" className="error" />
                </div>

                <div>
                  <label htmlFor="powerDescription">Power Description</label>
                  <Field type="text" name="powerDescription" />
                  <ErrorMessage name="powerDescription" component="div" className="error" />
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Create Power
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default HeroForm;
