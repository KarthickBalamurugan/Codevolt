# Voltelligence - making EV Smarter & Greener.

<p align="right"><strong>🔥 Cooked by - Namma Than</strong></p>


## Overview​
This documentation describes an intelligent energy optimization system for Electric Vehicles (EVs) and hybrid powertrains. The system addresses the limitations of current EVs, which often rely on fixed efficiency frameworks and lack adaptive strategies to accommodate changing environmental and operational conditions. By leveraging real-time data, cloud-based processing, and AI-driven algorithms, the proposed solution dynamically adjusts voltage and power distribution to maximize energy efficiency.

## Github link for ML model
https://github.com/VenkataramanaKB/voltage-predictor.git

## Problem Context

- **Fixed Efficiency Frameworks:** Many EVs are designed with static power management, limiting their ability to respond to real-time variables such as altitude, temperature, and humidity.
- **Environmental Sensitivity:** Fluctuations in temperature, humidity, and altitude directly affect battery performance.
- **Reduced Range:** Inefficient energy distribution results in lower range and inconsistent performance.
- **Unpredictable Conditions:** Rapid changes in these environmental parameters challenge traditional power management systems.

## Proposed Architecture

### Data Acquisition:
- Collects inputs from sensors and external APIs, including environmental parameters such as temperature, humidity, and altitude.
- Gathers battery status (voltage, state of charge, temperature).

### Cloud-Based AI Models:
- Processes data in real time to predict power demand and determine optimal voltage levels.
- Employs machine learning to adapt to varying environmental conditions.

### Adaptive Voltage Control:
- Dynamically adjusts voltage output for the motor and other subsystems.
- Maintains optimal power distribution to reduce energy losses.

### Real-Time Dashboard:
- Provides feedback and recommendations to drivers or fleet operators.
- Offers insights for predictive maintenance and future route planning.

### Continuous Updates:
- The system refines its predictive models using ongoing data.
- Ensures the algorithm remains effective over the vehicle’s lifespan.​

## Technical Approach

Our solution leverages a data-driven predictive model to optimize energy efficiency in electric vehicles. The model is designed to dynamically adjust voltage based on both vehicle and environmental data, ensuring optimal power distribution under varying conditions.

### Feature Selection and Data Integration​
A carefully curated set of features is used to capture the key aspects of vehicle performance and battery health. The selected features include:

- **Motor_Temp:** Reflects the operating temperature of the motor.
- **Pack_Avg_C_Temp:** Indicates the average temperature of the battery pack cells.
- **SOC (State of Charge) and SOH (State of Health):** Provide insights into the battery's current charge level and overall condition.
- **HV_Bat_Current_2:** Monitors the high-voltage battery current.
- **Instant_kW and kWh_Remaining:** Measure the immediate power usage and the remaining energy in the battery, respectively.
- **Torque and Speed:** Capture the vehicle's dynamic performance.
- **Brake, Acc_Pedal, ECO, and ePedal:** Reflect driver inputs and efficiency modes that directly impact energy consumption.
- **HV_Bat_Voltage:** Essential for tracking battery voltage, which is the primary prediction target.

In addition to these vehicle-specific features, real-time temperature data is incorporated to provide a crucial environmental context. This integration allows the model to account for the influence of ambient temperature on battery efficiency and overall vehicle performance.

### Model Implementation and Hyperparameter Tuning​
The predictive model is built using **XGBoost**, a powerful gradient boosting algorithm known for its efficiency and ability to model complex, non-linear relationships. XGBoost was chosen because of its robustness in handling structured data and its capacity for fast, scalable training.

To further enhance the model's performance, extensive hyperparameter tuning was performed. This optimization process involved adjusting parameters such as learning rate, maximum tree depth, subsample ratio, and regularization terms. The result of this hypertuning is a model that achieves a **mean absolute error of 0.30 volts** in predicting the optimal voltage adjustments—a strong indicator of the model's precision.

### Ongoing Research and Future Enhancements​
In parallel with the current model development, we are actively investigating additional environmental factors that could further influence energy efficiency. By exploring variables beyond temperature—such as humidity and altitude—we aim to refine the predictive capability of the system even more, potentially uncovering new opportunities for energy savings.

## Key Features

- **Scalability:** Cloud-based architecture handles large volumes of data and supports many vehicles simultaneously.
- **Plug-and-Play Module:** A minimally invasive module that can be integrated into existing EVs or fleets.
- **User-Friendly Interface:** Real-time metrics, alerts, and analytics are accessible for both technical and non-technical stakeholders.

## Expected Impact

- **Efficiency Gains:** Real-time adaptation can significantly reduce energy wastage and increase vehicle range.
- **Cost Savings:** Older or lower-end EV models can benefit without expensive hardware overhauls.
- **OEM Integration:** The solution can be incorporated into new designs or sold as a licensing option.
- **Enhanced User Experience:** Drivers gain actionable insights for optimizing daily commutes and fleet operations.

## Market Opportunities

- **OEM Partnerships:** Collaboration with automakers to embed the solution in next-generation EVs.
- **Fleet Management:** Companies operating large fleets (delivery, ridesharing) benefit from continuous efficiency improvements and reduced operating costs.

## Related Academic References on Improving Energy Efficiency

1. **Zhang, X., Mi, C. C., Yang, L., & Anderson, C. (2011).** “Advanced Vehicle Power Management: Modeling, Control and Optimization.” Springer.​  
   - *Quote:* “By incorporating real-time driving conditions and power demands, energy management systems can dynamically allocate battery resources, resulting in improved overall efficiency.”

2. **Onori, S., Serrao, L., & Rizzoni, G. (2014).** “Hybrid Electric Vehicles: Energy Management Strategies.” In Encyclopedia of Automotive Engineering (pp. 1–18). Wiley.​  
   - *Quote:* “Adaptive and predictive control algorithms are key to optimizing energy usage in hybrid powertrains, significantly extending vehicle range.”

3. **Zhou, J., et al. (2021).** “Intelligent Voltage Regulation for Electric Vehicle Battery Efficiency.” Applied Energy, 304, 117755.​  
   - *Quote:* “Dynamic voltage regulation in response to driving conditions is one of the most effective methods to reduce battery stress and increase energy efficiency.”
