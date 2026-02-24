import { useState } from 'react';

const ReviewForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        diningType: 'Dine-in',
        tableAvailability: 'Yes',
        deliveryApp: 'Uber Eats',
        deliverySpeed: 'On Time',
        foodTemp: 'Hot & Fresh',
        deliveryCondition: 'Perfect condition',
        busyness: 'Moderate',
        busynessDetails: '',
        vibe: 'Cozy',
        vibeDetails: '',
        cleanliness: 'Spotless',
        cleanlinessDetails: '',
        serviceType: 'Table Service',
        counterAttentive: 'Yes',
        counterRecommended: 'No',
        recommendedItems: '',
        staffName: '',
        serviceQuality: 'Attentive',
        starDish: '',
        verdict: ''
    });
    const [generatedReview, setGeneratedReview] = useState('');
    const [showToast, setShowToast] = useState(false);

    const totalSteps = formData.diningType === 'Delivery' ? 3 : 4; // Delivery has 3 phases

    const handleInputChange = (e) => {
        const { id, value, type, name } = e.target;
        if (type === 'radio') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const synthesisEngine = () => {
        const {
            name, location, diningType, tableAvailability, deliveryApp, busyness, busynessDetails, vibe, vibeDetails, cleanliness, cleanlinessDetails,
            serviceType, counterAttentive, counterRecommended, recommendedItems, staffName,
            serviceQuality, starDish, verdict, deliverySpeed, foodTemp, deliveryCondition
        } = formData;

        const isNegativeExperience =
            deliverySpeed === 'Late' ||
            foodTemp === 'Cold' ||
            deliveryCondition === 'Spilled or damaged' ||
            serviceQuality === 'Rushed' ||
            serviceQuality === 'Inattentive' ||
            cleanliness === 'A bit messy' ||
            cleanliness === 'Needs serious improvement';

        let review = '';
        if (diningType === 'Delivery') {
            review += `I recently ordered delivery from ${name}${location ? ` in ${location}` : ''} using ${deliveryApp}, and `;
        } else {
            review += `I recently visited ${name}${location ? ` in ${location}` : ''} for some ${diningType.toLowerCase()} food. `;
        }

        if (diningType === 'Delivery') {
            if (deliverySpeed === 'Fast') {
                review += `it arrived incredibly fast! `;
            } else if (deliverySpeed === 'On Time') {
                review += `it arrived right on time. `;
            } else {
                review += `it unfortunately took quite a long time to get here. `;
            }

            if (foodTemp === 'Hot & Fresh') {
                review += `Despite being delivery, the food arrived piping hot and fresh. `;
            } else if (foodTemp === 'Warm') {
                review += `The food was still warm when it arrived. `;
            } else {
                review += `Sadly, the food was completely cold by the time we got it. `;
            }

            if (deliveryCondition === 'Perfect condition') {
                review += `Everything was packaged perfectly without any mess. `;
            } else if (deliveryCondition === 'A bit messy') {
                review += `The packaging was a bit messy, but manageable. `;
            } else {
                review += `Disappointingly, the food was spilled and damaged in transit. `;
            }
        } else if (diningType === 'Dine-in') {
            if (tableAvailability === 'Yes') {
                review += `It was very easy to get a table. `;
            } else {
                review += `We had to wait a bit to get a table, but it was worth it. `;
            }
        }

        if (diningType !== 'Delivery') {
            review += `The place was ${busyness.toLowerCase()} when I went`;
            if (busynessDetails) {
                review += ` (${busynessDetails})`;
            }
            review += `, but it maintained a really ${vibe.toLowerCase()} atmosphere`;
            if (vibeDetails) {
                review += `—${vibeDetails}`;
            }
            review += `. I was also pleased to see that everything was kept ${cleanliness.toLowerCase()}`;
            if (cleanlinessDetails) {
                review += ` (${cleanlinessDetails})`;
            }
            review += `. `;

            if (serviceType === 'Counter Service') {
                review += `Since you order at the register, I interacted with the staff right away. `;
                if (staffName) {
                    review += `${staffName} helped me out, and was `;
                } else {
                    review += `The associate at the counter was `;
                }

                if (counterAttentive === 'Yes') {
                    review += `very attentive while taking my order`;
                } else {
                    review += `a bit distracted while taking my order`;
                }

                if (counterRecommended === 'Yes') {
                    review += ` and even offered some great recommendations! `;
                    if (recommendedItems) {
                        review += `They specifically suggested trying the ${recommendedItems}, which was a nice touch. `;
                    }
                } else {
                    review += `. `;
                }
            } else {
                review += `We were seated for table service, and the staff was remarkably ${serviceQuality.toLowerCase()} throughout the meal. `;
                if (staffName) {
                    review += `Specifically, ${staffName} took great care of us. `;
                }
            }
        }

        if (starDish) {
            if (diningType === 'Delivery') {
                if (isNegativeExperience) {
                    review += `After we tried everything, the highlight was definitely the ${starDish}—and honestly the only thing I could recommend you guys to try from here. `;
                } else {
                    review += `After we tried everything, the highlight was definitely the ${starDish}—an absolute standout that you have to try. `;
                }
            } else {
                if (isNegativeExperience) {
                    review += `When the food came out, the highlight was definitely the ${starDish}—and honestly the only thing I could recommend you guys to try from here. `;
                } else {
                    review += `When the food came out, the highlight was definitely the ${starDish}—an absolute standout that you have to try. `;
                }
            }
        }

        review += `\n\nOverall, ${verdict}`;

        setGeneratedReview(review);
        setStep(totalSteps); // Move to result view
    };

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(prev => prev + 1);
        } else {
            synthesisEngine();
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '', location: '', diningType: 'Dine-in', tableAvailability: 'Yes', deliveryApp: 'Uber Eats', deliverySpeed: 'On Time', foodTemp: 'Hot & Fresh', deliveryCondition: 'Perfect condition', busyness: 'Moderate', busynessDetails: '', vibe: 'Cozy', vibeDetails: '',
            cleanliness: 'Spotless', cleanlinessDetails: '', serviceType: 'Table Service', counterAttentive: 'Yes',
            counterRecommended: 'No', recommendedItems: '', staffName: '', serviceQuality: 'Attentive', starDish: '', verdict: ''
        });
        setStep(0);
        setGeneratedReview('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedReview);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const isCurrentStepValid = () => {
        if (step === 0) return formData.name.trim() !== '';
        if (step === totalSteps - 1) return formData.verdict.trim() !== '';
        return true; // other steps have defaults or are optional
    };

    const progressPercentage = step === totalSteps ? 100 : (step / totalSteps) * 100;

    // Render Helpers
    const RadioOption = ({ name, value, label }) => (
        <label className={`radio-label ${formData[name] === value ? 'selected' : ''}`}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={formData[name] === value}
                onChange={handleInputChange}
            />
            {label || value}
        </label>
    );

    return (
        <div className="glass-card">
            <div className={`toast ${showToast ? 'show' : ''}`}>Copied to clipboard!</div>

            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            {step === 0 && (
                <div className="step-container">
                    <h2 className="step-header">Phase 1: The Basics</h2>

                    <div className="question-group">
                        <label className="question-title">Restaurant Name *</label>
                        <input type="text" id="name" className="input-field" placeholder="e.g., The Rustic Spoon" value={formData.name} onChange={handleInputChange} autoFocus />
                    </div>

                    <div className="question-group">
                        <label className="question-title">Location / Neighborhood</label>
                        <input type="text" id="location" className="input-field" placeholder="e.g., Downtown Brooklyn" value={formData.location} onChange={handleInputChange} />
                    </div>

                    <div className="question-group">
                        <label className="question-title">Dining Type</label>
                        <div className="radio-group">
                            <RadioOption name="diningType" value="Dine-in" />
                            <RadioOption name="diningType" value="Takeout" />
                            <RadioOption name="diningType" value="Delivery" />
                        </div>
                    </div>

                    {formData.diningType === 'Dine-in' && (
                        <div className="question-group" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <label className="question-title">Was it easy to get a table?</label>
                            <div className="radio-group">
                                <RadioOption name="tableAvailability" value="Yes" />
                                <RadioOption name="tableAvailability" value="No" />
                            </div>
                        </div>
                    )}

                    {formData.diningType === 'Delivery' && (
                        <div className="question-group" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                            <label className="question-title">How did you order?</label>
                            <select id="deliveryApp" className="select-field" value={formData.deliveryApp} onChange={handleInputChange}>
                                <option>Uber Eats</option>
                                <option>Door Dash</option>
                                <option>Postmates</option>
                                <option>Wolt</option>
                                <option>Store Delivery</option>
                            </select>
                        </div>
                    )}
                </div>
            )}

            {step === 1 && formData.diningType !== 'Delivery' && (
                <div className="step-container">
                    <h2 className="step-header">Phase 2: Atmosphere</h2>

                    <div className="question-group">
                        <label className="question-title">How busy was it?</label>
                        <select id="busyness" className="select-field" value={formData.busyness} onChange={handleInputChange}>
                            <option>Dead</option>
                            <option>Quiet</option>
                            <option>Moderate</option>
                            <option>Very Busy</option>
                            <option>Packed</option>
                        </select>
                        <input type="text" id="busynessDetails" className="input-field" placeholder="Elaborate (e.g., packed on a Saturday night)" value={formData.busynessDetails} onChange={handleInputChange} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="question-group">
                        <label className="question-title">What was the vibe?</label>
                        <select id="vibe" className="select-field" value={formData.vibe} onChange={handleInputChange}>
                            <option>Cozy</option>
                            <option>Loud & Energetic</option>
                            <option>Elegant & refined</option>
                            <option>Casual</option>
                            <option>Intimate</option>
                        </select>
                        <input type="text" id="vibeDetails" className="input-field" placeholder="Elaborate (e.g., great playlist playing)" value={formData.vibeDetails} onChange={handleInputChange} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="question-group">
                        <label className="question-title">Cleanliness</label>
                        <select id="cleanliness" className="select-field" value={formData.cleanliness} onChange={handleInputChange}>
                            <option>Spotless</option>
                            <option>Acceptable</option>
                            <option>A bit messy</option>
                            <option>Needs serious improvement</option>
                        </select>
                        <input type="text" id="cleanlinessDetails" className="input-field" placeholder="Elaborate (e.g., tables were wiped immediately)" value={formData.cleanlinessDetails} onChange={handleInputChange} style={{ marginTop: '8px' }} />
                    </div>
                </div>
            )}

            {step === 1 && formData.diningType === 'Delivery' && (
                <div className="step-container">
                    <h2 className="step-header">Phase 2: Delivery Experience</h2>

                    <div className="question-group">
                        <label className="question-title">Delivery Speed</label>
                        <div className="radio-group">
                            <RadioOption name="deliverySpeed" value="Fast" />
                            <RadioOption name="deliverySpeed" value="On Time" />
                            <RadioOption name="deliverySpeed" value="Late" />
                        </div>
                    </div>

                    <div className="question-group">
                        <label className="question-title">Food Temperature</label>
                        <div className="radio-group">
                            <RadioOption name="foodTemp" value="Hot & Fresh" />
                            <RadioOption name="foodTemp" value="Warm" />
                            <RadioOption name="foodTemp" value="Cold" />
                        </div>
                    </div>

                    <div className="question-group">
                        <label className="question-title">Condition upon arrival</label>
                        <select id="deliveryCondition" className="select-field" value={formData.deliveryCondition} onChange={handleInputChange}>
                            <option>Perfect condition</option>
                            <option>A bit messy</option>
                            <option>Spilled or damaged</option>
                        </select>
                    </div>
                </div>
            )}

            {step === 2 && formData.diningType !== 'Delivery' && (
                <div className="step-container">
                    <h2 className="step-header">Phase 3: The Service</h2>

                    <div className="question-group">
                        <label className="question-title">Type of Service</label>
                        <div className="radio-group">
                            <RadioOption name="serviceType" value="Table Service" />
                            <RadioOption name="serviceType" value="Counter Service" />
                        </div>
                    </div>

                    <div className="question-group">
                        <label className="question-title">Any staff member stand out? (Name)</label>
                        <input type="text" id="staffName" className="input-field" placeholder="e.g., Sarah (Optional)" value={formData.staffName} onChange={handleInputChange} />
                    </div>

                    {formData.serviceType === 'Table Service' ? (
                        <div className="question-group">
                            <label className="question-title">Service Quality</label>
                            <select id="serviceQuality" className="select-field" value={formData.serviceQuality} onChange={handleInputChange}>
                                <option>Attentive</option>
                                <option>Friendly but Slow</option>
                                <option>Knowledgeable</option>
                                <option>Rushed</option>
                                <option>Inattentive</option>
                            </select>
                        </div>
                    ) : (
                        <>
                            <div className="question-group">
                                <label className="question-title">Were they attentive while taking your order?</label>
                                <div className="radio-group">
                                    <RadioOption name="counterAttentive" value="Yes" />
                                    <RadioOption name="counterAttentive" value="No" />
                                </div>
                            </div>
                            <div className="question-group">
                                <label className="question-title">Did they recommend anything?</label>
                                <div className="radio-group">
                                    <RadioOption name="counterRecommended" value="Yes" />
                                    <RadioOption name="counterRecommended" value="No" />
                                </div>
                            </div>

                            {formData.counterRecommended === 'Yes' && (
                                <div className="question-group" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                    <label className="question-title">What did they recommend?</label>
                                    <input type="text" id="recommendedItems" className="input-field" placeholder="e.g., The seasonal latte" value={formData.recommendedItems} onChange={handleInputChange} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {(step === 3 && formData.diningType !== 'Delivery' || step === 2 && formData.diningType === 'Delivery') && (
                <div className="step-container">
                    <h2 className="step-header">Phase 4: Food & Verdict</h2>

                    <div className="question-group">
                        <label className="question-title">What was the standout dish?</label>
                        <input type="text" id="starDish" className="input-field" placeholder="e.g., Truffle Mac & Cheese (Optional)" value={formData.starDish} onChange={handleInputChange} autoFocus />
                    </div>

                    <div className="question-group">
                        <label className="question-title">One-sentence summary verdict *</label>
                        <textarea id="verdict" className="textarea-field" placeholder="e.g., A must-visit for any pasta lover." value={formData.verdict} onChange={handleInputChange} />
                    </div>
                </div>
            )}

            {step === totalSteps && (
                <div className="result-container step-container">
                    <h2 className="step-header">Your Masterpiece</h2>
                    <div className="result-text">{generatedReview}</div>

                    <div className="button-group">
                        <button className="btn btn-secondary" onClick={resetForm}>
                            Start Over
                        </button>
                        <button className="btn btn-primary" onClick={copyToClipboard}>
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            )}

            {step < totalSteps && (
                <div className="button-group">
                    <button className="btn btn-secondary" onClick={handleBack} disabled={step === 0}>
                        Back
                    </button>
                    <button className="btn btn-primary" onClick={handleNext} disabled={!isCurrentStepValid()}>
                        {step === totalSteps - 1 ? 'Generate Review' : 'Next Step'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
