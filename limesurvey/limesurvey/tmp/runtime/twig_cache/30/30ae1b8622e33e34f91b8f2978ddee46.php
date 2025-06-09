<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* ./subviews/header/custom_header.twig */
class __TwigTemplate_593ad1621ccb780bc194a1c56eec656f extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 17
        yield "
";
        // line 19
        yield "<style>
    ";
        // line 20
        if (((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 20), "backgroundimage", [], "any", false, false, true, 20) == "on") && LS_Twig_Extension::imageSrc(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 20), "backgroundimagefile", [], "any", false, false, true, 20)))) {
            // line 21
            yield "        body {
            background-image: url('";
            // line 22
            yield LS_Twig_Extension::imageSrc($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 22), "backgroundimagefile", [], "any", false, false, true, 22), 22, $this->source));
            yield "');
            background-attachment: fixed;
            background-size: cover;

        }

        body .top-container {
            background-color: rgba(236, 240, 241, 0.2);
        }
    ";
        }
        // line 32
        yield "
    ";
        // line 33
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 33), "brandlogo", [], "any", false, false, true, 33) == "on")) {
            // line 34
            yield "        body .top-container {
            margin-top: 70px;
        }
    ";
        }
        // line 38
        yield "
    body {
         padding-bottom: 10px;
         /*padding-top: 60px;!* now is redefine in JS to fit any title length *!*/
         background-color:";
        // line 42
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 42), "bodybackgroundcolor", [], "any", false, false, true, 42), 42, $this->source);
        yield " ;
         color: ";
        // line 43
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 43), "fontcolor", [], "any", false, false, true, 43), 43, $this->source);
        yield ";
    }

    .navbar-default .navbar-nav > li > a:hover {
        color: ";
        // line 47
        yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 47), "fontcolor", [], "any", false, false, true, 47), 47, $this->source);
        yield ";
    }

    ";
        // line 50
        $context["checkicon"] = (("\"\\" . $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 50), "checkicon", [], "any", false, false, true, 50), 50, $this->source)) . "\"");
        // line 51
        yield "    .checkbox-item input[type=\"checkbox\"]:checked + label::after, .checkbox-item input[type=\"radio\"]:checked + label::after {
        content: ";
        // line 52
        yield $this->sandbox->ensureToStringAllowed(($context["checkicon"] ?? null), 52, $this->source);
        yield ";
    }

    ";
        // line 55
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 55), "animatecheckbox", [], "any", false, false, true, 55) == "on")) {
            // line 56
            yield "
        ";
            // line 57
            if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 57), "checkboxanimationduration", [], "any", false, false, true, 57) < 1)) {
                // line 58
                yield "            ";
                $context["checkboxanimationduration"] = 500;
                // line 59
                yield "        ";
            } else {
                // line 60
                yield "            ";
                $context["checkboxanimationduration"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 60), "checkboxanimationduration", [], "any", false, false, true, 60);
                // line 61
                yield "        ";
            }
            // line 62
            yield "
        .checkbox-item input[type=\"checkbox\"]:checked + label::after{
            animation-name: ";
            // line 64
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 64), "checkboxanimation", [], "any", false, false, true, 64), 64, $this->source);
            yield ";
            animation-duration: ";
            // line 65
            yield $this->sandbox->ensureToStringAllowed(($context["checkboxanimationduration"] ?? null), 65, $this->source);
            yield "ms;
            animation-fill-mode: both;
            animation-iteration-count: 1;
            display: inline-block;
            -webkit-transform: none;
            -ms-transform: none;
            -o-transform: none;
            transform: none;
        }
        .checkbox-item input[type=\"checkbox\"] + label::after{
            display: none;
            -webkit-transform: none;
            -ms-transform: none;
            -o-transform: none;
            transform: none;
        }
    ";
        }
        // line 82
        yield "
    ";
        // line 83
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 83), "animateradio", [], "any", false, false, true, 83) == "on")) {
            // line 84
            yield "
        ";
            // line 85
            if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 85), "radioanimationduration", [], "any", false, false, true, 85) < 1)) {
                // line 86
                yield "            ";
                $context["radioanimationduration"] = 500;
                // line 87
                yield "        ";
            } else {
                // line 88
                yield "            ";
                $context["radioanimationduration"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 88), "radioanimationduration", [], "any", false, false, true, 88);
                // line 89
                yield "        ";
            }
            // line 90
            yield "
        .radio-item input[type=\"radio\"]:checked + label::after{
            animation-name: ";
            // line 92
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 92), "radioanimation", [], "any", false, false, true, 92), 92, $this->source);
            yield ";
            animation-duration: ";
            // line 93
            yield $this->sandbox->ensureToStringAllowed(($context["radioanimationduration"] ?? null), 93, $this->source);
            yield "ms;
            animation-fill-mode: both;
            animation-iteration-count: 1;
            display: inline-block;
            -webkit-transform: none;
            -ms-transform: none;
            -o-transform: none;
            transform: none;
        }
        .radio-item input[type=\"radio\"] + label::after{
            display:none;
            -webkit-transform: none;
            -ms-transform: none;
            -o-transform: none;
            transform: none;
        }
    ";
        }
        // line 110
        yield "
    ";
        // line 111
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 111), "animatequestion", [], "any", false, false, true, 111) == "on")) {
            // line 112
            yield "
        ";
            // line 113
            if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 113), "questionanimationduration", [], "any", false, false, true, 113) < 1)) {
                // line 114
                yield "            ";
                $context["questionanimationduration"] = 500;
                // line 115
                yield "        ";
            } else {
                // line 116
                yield "            ";
                $context["questionanimationduration"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 116), "questionanimationduration", [], "any", false, false, true, 116);
                // line 117
                yield "        ";
            }
            // line 118
            yield "
        .question-container {
            animation-name: ";
            // line 120
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 120), "questionanimation", [], "any", false, false, true, 120), 120, $this->source);
            yield ";
            animation-duration: ";
            // line 121
            yield $this->sandbox->ensureToStringAllowed(($context["questionanimationduration"] ?? null), 121, $this->source);
            yield "ms;
            animation-fill-mode: both;
        }
    ";
        }
        // line 125
        yield "
    ";
        // line 126
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 126), "animatealert", [], "any", false, false, true, 126) == "on")) {
            // line 127
            yield "
        ";
            // line 128
            if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 128), "alertanimationduration", [], "any", false, false, true, 128) < 1)) {
                // line 129
                yield "            ";
                $context["alertanimationduration"] = 500;
                // line 130
                yield "        ";
            } else {
                // line 131
                yield "            ";
                $context["alertanimationduration"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 131), "alertanimationduration", [], "any", false, false, true, 131);
                // line 132
                yield "        ";
            }
            // line 133
            yield "
        .alert {
            animation-name: ";
            // line 135
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 135), "alertanimation", [], "any", false, false, true, 135), 135, $this->source);
            yield ";
            animation-duration: ";
            // line 136
            yield $this->sandbox->ensureToStringAllowed(($context["alertanimationduration"] ?? null), 136, $this->source);
            yield "ms;
            animation-fill-mode: both;
        }
    ";
        }
        // line 140
        yield "
    ";
        // line 141
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 141), "animatebody", [], "any", false, false, true, 141) == "on")) {
            // line 142
            yield "
        ";
            // line 143
            if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 143), "bodyanimationduration", [], "any", false, false, true, 143) < 1)) {
                // line 144
                yield "            ";
                $context["bodyanimationduration"] = 500;
                // line 145
                yield "        ";
            } else {
                // line 146
                yield "            ";
                $context["bodyanimationduration"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 146), "bodyanimationduration", [], "any", false, false, true, 146);
                // line 147
                yield "        ";
            }
            // line 148
            yield "
        #outerframeContainer {
            animation-name: ";
            // line 150
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 150), "bodyanimation", [], "any", false, false, true, 150), 150, $this->source);
            yield ";
            animation-duration: ";
            // line 151
            yield $this->sandbox->ensureToStringAllowed(($context["bodyanimationduration"] ?? null), 151, $this->source);
            yield "ms;
            animation-fill-mode: both;
        }
    ";
        }
        // line 155
        yield "</style>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/header/custom_header.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  317 => 155,  310 => 151,  306 => 150,  302 => 148,  299 => 147,  296 => 146,  293 => 145,  290 => 144,  288 => 143,  285 => 142,  283 => 141,  280 => 140,  273 => 136,  269 => 135,  265 => 133,  262 => 132,  259 => 131,  256 => 130,  253 => 129,  251 => 128,  248 => 127,  246 => 126,  243 => 125,  236 => 121,  232 => 120,  228 => 118,  225 => 117,  222 => 116,  219 => 115,  216 => 114,  214 => 113,  211 => 112,  209 => 111,  206 => 110,  186 => 93,  182 => 92,  178 => 90,  175 => 89,  172 => 88,  169 => 87,  166 => 86,  164 => 85,  161 => 84,  159 => 83,  156 => 82,  136 => 65,  132 => 64,  128 => 62,  125 => 61,  122 => 60,  119 => 59,  116 => 58,  114 => 57,  111 => 56,  109 => 55,  103 => 52,  100 => 51,  98 => 50,  92 => 47,  85 => 43,  81 => 42,  75 => 38,  69 => 34,  67 => 33,  64 => 32,  51 => 22,  48 => 21,  46 => 20,  43 => 19,  40 => 17,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/header/custom_header.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/header/custom_header.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 20, "set" => 50);
        static $filters = array();
        static $functions = array("imageSrc" => 20);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set'],
                [],
                ['imageSrc'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
