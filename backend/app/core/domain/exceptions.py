"""Custom System Architecture Layer Domain Exceptions."""

class MoKisCoreException(Exception):
    """Abstract structural layer for all internal operational engine failures."""
    def __init__(self, message: str, error_code: str):
        super().__init__(message)
        self.message = message
        self.error_code = error_code

class HardwareCommunicationException(MoKisCoreException):
    """Raised when the serial link experiences data loss or device drops."""
    pass

class AutomationPolicyException(MoKisCoreException):
    """Raised when evaluation pipelines encounter invalid parameters."""
    pass

class AIInferenceException(MoKisCoreException):
    """Raised when ONNX execution contexts experience runtime structural exceptions."""
    pass
