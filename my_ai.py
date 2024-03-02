from keras.models import load_model  # TensorFlow is required for Keras to work
import cv2  # Install opencv-python
import numpy as np

# Disable scientific notation for clarity
np.set_printoptions(suppress=True)


class DetectPersonModel:
    # Load the model
    model = load_model("keras_Model.h5", compile=False)

    # Load the labels
    class_names = open("./labels.txt", "r").readlines()

    # CAMERA can be 0 or 1 based on default camera of your computer
    camera = cv2.VideoCapture(0)

    def detect_person(self):
        # Grab the webcamera's image.
        ret, image = self.camera.read()

        # Resize the raw image into (224-height,224-width) pixels
        image = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)

        # Show the image in a window
        # cv2.imshow("Webcam Image", image)

        # Make the image a numpy array and reshape it to the models input shape.
        image = np.asarray(image, dtype=np.float32).reshape(1, 224, 224, 3)

        # Normalize the image array
        image = (image / 127.5) - 1

        # Predicts the model
        prediction = self.model.predict(image)
        index = np.argmax(prediction)
        class_name = self.class_names[index]
        confidence_score = prediction[0][index]
        # Print prediction and confidence score
        print(f"Class: {class_name[2:]}, Confidence Score: {(confidence_score * 100):.2f}%")
        return [class_name[2:], confidence_score]

    def exit(self):
        # Listen to the keyboard for presses.
        keyboard_input = cv2.waitKey(1)

    # 27 is the ASCII for the esc key on your keyboard.
        if keyboard_input == 27:
            self.camera.release()
            cv2.destroyAllWindows()
            return 1
        return 0

# for testing
# temp = DetectPersonModel()
# while True:
#     temp.detect_person()
