from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import threading
import time

app = Flask(__name__)
CORS(app)

lock = threading.Lock()
predicted_values = []
executed_time=0
features_32 = ['Flow Duration', 'Total Fwd Packets', 'Total Length of Fwd Packets','Fwd Packet Length Max', 'Flow Packets/s', 'Flow IAT Mean','Flow IAT Max', 'Flow IAT Min', 'Fwd IAT Total', 'Fwd IAT Mean','Fwd IAT Max', 'Fwd IAT Min', 'Bwd Header Length', 'Fwd Packets/s','Max Packet Length', 'Packet Length Mean', 'ACK Flag Count','Average Packet Size', 'Avg Fwd Segment Size', 'Fwd Header Length.1','Init_Win_bytes_forward', 'Init_Win_bytes_backward', 'act_data_pkt_fwd','min_seg_size_forward', 'Inbound', 'Packet Length Std','Packet Length Variance', 'Flow Bytes/s', 'Flow IAT Std', 'Fwd IAT Std','Min Packet Length', 'Total Backward Packets']

@app.route("/upload_file", methods=["POST"])
def upload_file():
    global predicted_values,executed_time
    file = request.files["file"]
    if file and file.filename.endswith('.csv'):
        df = pd.read_csv(file)
        model = joblib.load('./ML_Models/decision_tree_32f.pkl')
        df = df[features_32]
        start = time.time()
        pred = model.predict(df)
        end = time.time()
        executed_time = end-start
        pred_list = pred.tolist() if isinstance(pred, np.ndarray) else pred
        with lock:
            predicted_values = pred_list
        response = jsonify({"success": True, "predicted": pred_list, "time": executed_time ,"message": "Valid file type."})
        response.headers.add('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
        return response
    else:
        response = jsonify({"success": False, "message": "Invalid file type. Please upload a csv file"})
        response.headers.add('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
        return response

@app.route("/get_predicted_values", methods=["GET"])
def get_pred_values():
    global predicted_values
    with lock:
        response = jsonify({"success": True, "predicted": predicted_values,"time":executed_time, "message": "Valid file type."})
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
    return response

if __name__ == "__main__":
    app.run(debug=True)
